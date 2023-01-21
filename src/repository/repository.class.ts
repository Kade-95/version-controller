import { IHead } from "../models/head.interface";
import { Store } from "../store/store.class";
import { IRepository } from "./repository.interface";
import { v4 as uuidV4 } from 'uuid';
import { Branch } from "../branch/branch.class";
import { IChange } from "../models/change.interface";
import { IBranch } from "../branch/branch.interface";
import { ICommit } from "../commit/commit.interface";
import { getChanges } from "../change/getChanges";
import { modify } from "../change/modify";

export class Repository<T> implements IRepository<T> {
    /**
    * @summary
    * Creates a repository
    *
    * @param _id - This is the unique id of the repository 
    * @param name - This is the name of the repository 
    * @param data - This is the data stored in the repository
    * @param board - This is the temp data of the repository
    * @param defaultBranch - This is the main branch of the repository
    * @param head - This the _ids of current branch and commit of the repository
    * @param changes - This is the list of changes in the repository
    * @param staged - This is the list of staged changes in the repository
    * @param store - This is the storage for the repository details
    * @param branchStore - This is the storage for the branches of the repository
    * @param commitStore - This is the storage for the commits of the repository
    * @param branch - This is the current branch
    * @param commit - This is the current commit
    * 
    * @type {T} - This is the schema of the data of the repository
    */

    private content: IRepository<T> | undefined;

    defaultBranch = 'main';
    head: IHead = { };
    board: T | undefined;
    readonly data: T;
    
    changes: IChange[] = [];
    staged: IChange[] = [];

    store: Store<IRepository<T>>;
    branchStore: Store<IBranch>;
    commitStore: Store<ICommit>;

    _id?: string;

    get branch(){
        /**
        * @summary
        * A get function used to fetch the current branch details
        *
        */
        return this.branchStore.read({ _id: this.head.branch });
    }

    get commit(){
        /**
        * @summary
        * A get function used to fetch the current commit details
        *
        */
        return this.commitStore.read({ _id: this.head.commit });
    }

    constructor(
        public name: string,
        data?: T,
        callback?: (repo: Repository<T>) => void
    ) {
        this.data = data as T;
        this.store = new Store(name, 'repo');
        this.branchStore = new Store(name, 'branches');
        this.commitStore = new Store(name, 'commits');
        
        this.setup(callback);
    }

    private async setup(
        callback: any
    ){
        /**
        * @summary
        * An async function used to initialize the Repository class
        * 
        * @param callback - This is a callback function to execute after repository is setup
        */

        await this.read();
        this.board = JSON.parse(JSON.stringify(this.data || null));

        if (callback) callback(this);  
    }

    async read() {
        /**
        * @summary
        * Read the contents of the repository off the storage
        *
        */

        this.content = await this.store.read({ name: this.name });                      
        // Set repo with the stored content
        Object.keys((this.content || {})).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });     

        return this.content;       
    }

    async add(
        paths?: string[][]
    ){
        /**
        * @summary
        * A function to add changes in repository board to repository data
        *
        * @param paths - This is list of path to the changes
        */

        const changes = getChanges(this.data, this.board, { bi: true });        
        paths = paths 
        ? paths 
        : changes.map(change => change.path);        

        for (const path of paths) {
            const change = changes.find(c => JSON.stringify(c.path) == JSON.stringify(path)) as IChange;            
            if (change){
                this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(path));
                this.changes.push(change);
            }
        }

        const data = modify(this.data, changes, 'update');        
        await this.store.update({ _id: this._id }, { changes: this.changes, data });
        await this.read();
    }

    async revert(
        paths?: string[][]
    ) {
        /**
        * @summary
        * A function to revert changes in repository data to repository board
        *
        * @param paths - This is list of path to the changes
        */

        if (!this.changes.length) return;
        paths = paths 
            ? paths 
            : this.changes.map(stage => stage.path);    
            
        const changes: IChange[] = [];

        for (const path of paths) {
            const change = this.changes.find(c => JSON.stringify(c.path) == JSON.stringify(path)) as IChange;            
            if (change){
                this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(path));
                changes.push(change);
            }
        }

        const data = modify(this.data, changes, 'rollback');
        await this.store.update({ _id: this._id }, { changes: this.changes, data });
        await this.read();
    }

    async stage(
        paths?: string[][]
    ) {
        /**
        * @summary
        * A function to add changes in repository changes to repository staging area
        *
        * @param paths - This is list of path to the changes
        */

        if (!this.changes.length) return;
        paths = paths 
            ? paths 
            : this.changes.map(change => change.path);        

        for (const path of paths) {
            const change = this.changes.find(c => JSON.stringify(c.path) == JSON.stringify(path));
            if (change) {
                this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(path));
                this.staged = this.staged.filter(c => JSON.stringify(c.path) != JSON.stringify(path));
                this.staged.push(change);
            }
        }

        await this.store.update({ _id: this._id }, { staged: this.staged, changes: this.changes });
        await this.read();
    }

    async unstage(
        paths?: string[][]
    ) {
        /**
        * @summary
        * A function to reverts staged changes from repository staged to repository changes
        *
        * @param paths - This is list of path to the changes
        */

        if (!this.staged.length) return;
        paths = paths 
            ? paths 
            : this.staged.map(stage => stage.path);             

        for (const path of paths) {
            const stage = this.staged.find(c => JSON.stringify(c.path) == JSON.stringify(path));
            const change = this.changes.find(c => JSON.stringify(c.path) == JSON.stringify(path));              

            if (stage && !change) {
                this.staged = this.staged.filter(c => JSON.stringify(c.path) != JSON.stringify(path));
                this.changes.push(stage);
            }
        }

        await this.store.update({ _id: this._id }, { staged: this.staged, changes: this.changes });
        await this.read();
    }

    safetyCheck() {
        /**
        * @summary
        * A function to check if the repository is safe for operations
        *
        */

        if (!!this.changes.length) throw new Error("Branch unsafe, active changes");
        if (!!this.staged.length) throw new Error("Branch unsafe, active staged changes");
    }

    delete(){
        /**
        * @summary
        * A function to delete the repository
        *
        */

        this.store.repo.drop();
        this.content = undefined;
    }

    static async create<T>(
        name: string,
        data: T
    ){
        /**
        * @summary
        * A function to create a new repository
        *
        * @param name - This is the name of the new repository
        * @param {T} data - This is the data to initialize the repository
        */

        const repo = new Repository(name, data);                       
        const branch = await Branch.create(repo, repo.defaultBranch);
        await branch.commit("Initial Commit"); 

        repo.head.branch = branch._id;        

        await repo.store.insert({
            _id: uuidV4(),
            name: repo.name,
            head: repo.head,
            data: repo.data,
            staged: repo.staged,
            changes: repo.changes,
            defaultBranch: repo.defaultBranch
        });

        return Repository.from<T>(name);
    }

    static from<T>(
        name: string, 
        data?: T
    ){
        /**
        * @summary
        * A function to create repository from an existing repository data
        *
        * @param name - This is the name of the new repository
        * @param {T} data - This is the data to initialize the repository
        */

        return new Promise<Repository<T>>((res) => new Repository(name, data, res));
    }
}