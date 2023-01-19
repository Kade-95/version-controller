import { IHead } from "../models/head.interface";
import { Store } from "../store/store.class";
import { IRepository } from "./repository.interface";
import { v4 as uuidV4 } from 'uuid';
import { Branch } from "../branch/branch.class";
import { IChange } from "../models/change.interface";
import { IBranch } from "../branch/branch.interface";
import { ICommit } from "../commit/commit.interface";
import { getChanges } from "../change/getChanges";
import { rollback } from "../change/rollback";

export class Repository<T> implements IRepository<T>{
    
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
        return this.branchStore.read({ _id: this.head.branch });
    }

    get commit(){
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
        await this.read();
        this.board = JSON.parse(JSON.stringify(this.data || null));

        if (callback) callback(this);  
    }

    async read() {
        // Read the stored content
        this.content = await this.store.read({ name: this.name });                      
        // Set repo with the stored content
        Object.keys((this.content || {})).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });     

        return this.content;       
    }

    async add(paths?: string[][]){
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

        await this.store.update({ _id: this._id }, { changes: this.changes, data: this.board });
        await this.read();
    }

    async revert(paths?: string[][]) {
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

        const data = rollback(this.data, changes);
        await this.store.update({ _id: this._id }, { changes: this.changes, data });
        await this.read();
    }

    async stage(paths?: string[][]) {
        // Each dir is a string
        // Each path is a list of string or a single string(dir)
        // There for paths is a list of strings or a list of list of strings

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

    async unstage(paths?: string[][]) {
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
        // Check there are staged or commited changes
        if (!!this.changes.length) throw new Error("Branch unsafe, active changes");
        if (!!this.staged.length) throw new Error("Branch unsafe, active staged changes");
    }

    delete(){
        this.store.repo.drop();
        this.content = undefined;
    }

    static async create<T>(
        name: string,
        data: T
    ){
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
        return new Promise<Repository<T>>((res) => new Repository(name, data, res));
    }
}