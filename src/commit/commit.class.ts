import { Repository } from "../repository/repository.class";
import { v4 as uuidV4 } from 'uuid';
import { Store } from "../store/store.class";
import { retrieve } from "../utils/retrieve";
import { ICommit, ICommitChange } from "./commit.interface";

export class Commit implements ICommit {
    private store: Store<ICommit>;
    private content: ICommit | undefined;
    
    changes: ICommitChange[] = [];
    message: string = ''; 
    ancestor: string = '';
    merged?: string;
    _id?: string;

    constructor(
        private repo: Repository<any>,
        _id: string,
        callback?: (branch: Commit) => void
    ) {
        this.store = new Store(this.repo.name, 'commits');        
        this.setup(callback);
    }

    private async setup(
        callback: any
    ){
        await this.read()
        if (callback) callback(this);
    }

    private async read(){
        this.content = await this.store.read({ _id: this._id });
        Object.keys(this.content as object).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });
    }

    async ancestory(){
        let ancestors: Commit[] = [];
        const history: string[] = [];
        this.ancestor && history.push(this.ancestor);
        this.merged && history.push(this.merged);

        if (history.length) {
            ancestors = await Promise.all(history.map((h) => Commit.from(this.repo, h)));

            const historyCommits = await ancestors.reduce(async (accPromice: Promise<Commit[]>, red: Commit) => {
                return [...await accPromice, ...await red.ancestory()];
            }, Promise.resolve([] as Commit[]));

            ancestors = [...ancestors, ...historyCommits];            
        }
        return ancestors;
    }

    static async create(
        repo: Repository<any>, 
        message: string, 
        ancestor: string,
        merged?: string
    ){
        if (!repo.staged.length && repo._id) return;

        let changes: ICommitChange[] = [];
        for (const item of repo.staged) {
            changes.push({ ...item, value: retrieve(repo.board, item.path) });
        }

        const data = {
            _id: uuidV4(), message: message, changes, ancestor: ancestor, merged: merged
        };

        repo.head.commit = data._id;
        repo.staged = [];

        await repo.branchStore.update({ _id: repo.head.branch }, { commit: data._id });
        await repo.commitStore.insert(data); 

        return Commit.from(repo, data._id);
    }

    static from(
        repo: Repository<any>,
        _id: string
    ){
        return new Promise<Commit>((res, _) => new Commit(repo, _id, res));
    }
}