import { IHead } from "../models/head.interface";
import { Store } from "../store/store.class";
import { IRepository } from "./repository.interface";
import { v4 as uuidV4 } from 'uuid';
import { Branch } from "../branch/branch.class";
import { IChange } from "../models/change.interface";
import { IBranch } from "../branch/branch.interface";
import { ICommit } from "../commit/commit.interface";
import { Commit } from "../commit/commit.class";
import { getChanges } from "../utils/getChanges";

export class Repository<T> implements IRepository<T>{
    
    private content: IRepository<T> | undefined;

    defaultBranch = 'main';
    head: IHead = { };
    board: T | undefined;
    
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
        readonly data: T,
        callback?: (error: any, repo: Repository<T>) => { }
    ) {
        this.store = new Store(name, 'repo');
        this.branchStore = new Store(name, 'branches');
        this.commitStore = new Store(name, 'commits');

        this.setup(callback);
    }

    private async setup(
        callback: any
    ){
        await this.read()
        this.board = JSON.parse(JSON.stringify(this.data || null));
        if (callback) callback(null, this);  
    }

    private async read() {
        // Read the stored content
        this.content = await this.store.read({ name: this.name });    
        if (!this.content) {
           await this.initialize();
        }    

        // Set repo with the stored content
        Object.keys(this.content as object).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });    
    }

    private async initialize() {                
        //Initialize repo with first commit, branch and the head, then checkout the branch and commit
        await Commit.create(this, "Initial Commit", this.head.commit as string);                
        const branch = await Branch.create(this, this.defaultBranch);            
        this.head.branch = branch._id;

        //Set the initial content
        this.content = {
            _id: uuidV4(),
            name: this.name,
            head: this.head,
            data: this.data,
            staged: this.staged,
            changes: this.changes,
            defaultBranch: this.defaultBranch
        };        

        //Create the repo
        await this.store.insert(this.content);        
    }

    safetyCheck() {
        // Check there are staged or commited changes
        if (!!this.changes.length) throw new Error("Unstaged Changes");
        if (!!this.staged.length) throw new Error("Uncommited Changes");
    }

    async save(){
        const changes = getChanges(this.data, this.board, { bi: true });

        for (const i in changes) {
            this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(changes[i].path));
            this.changes.push(changes[i]);
        }

        await this.store.update({ _id: this._id }, { changes: this.changes, data: this.board });
        await this.read();
    }

    async stage(paths?: string[][]) {
        // Each dir is a string
        // Each path is a list of string or a single string(dir)
        // There for paths is a list of strings or a list of list of strings

        if (!this.changes.length) return;

        if (paths) {
            for (const path of paths) {
                const change = this.changes.find(c => JSON.stringify(c.path) == JSON.stringify(path));
                if (change) {
                    this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(change.path));
                    this.staged = this.staged.filter(c => JSON.stringify(c.path) != JSON.stringify(change.path));
                    this.staged.push(change);
                }
            }
        }
        else {
            for (const change of this.changes) {
                this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(change.path));
                this.staged = this.staged.filter(c => JSON.stringify(c.path) != JSON.stringify(change.path));
                this.staged.push(change);
            }
        }

        await this.store.update({ _id: this._id }, { staged: this.staged, changes: this.changes });
    }
}