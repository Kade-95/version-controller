import { Repository } from "../repository/repository.class";
import { v4 as uuidV4 } from 'uuid';
import { Store } from "../store/store.class";
import { retrieve } from "../change/retrieve";
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

    equals(commit: ICommit){
        return this._id === commit._id;
    }

    async isAncestor(
        commit: Commit
    ){
        const childAncestory = await commit.ancestory();
        return !!childAncestory.find(a => a._id == this._id);
    }

    async lastCommonAncestor(
        commit: Commit
    ){
        const myHistory = (await this.ancestory()).reverse();
        const commitHistory = (await commit.ancestory()).reverse();

        let last: Commit | undefined;
        if (this.equals(commit)) last = this;
        else if(await this.isAncestor(commit)) last = this;
        else if(await commit.isAncestor(this)) last = commit;
        else {
            for (const a of myHistory){
                for (const b of commitHistory){
                    if (a.equals(b)) {
                        last = a;
                        break;
                    }
                }
            }
        }

        return last;
    }

    async listCommitsTillAncestor(
        ancestor: Commit
    ){
        const commits: Commit[] = [];

        if (!ancestor.isAncestor(this) && !this.equals(ancestor)){
            return [];
        }

        commits.push(this);
        const ancestors = await this.ancestory();
        const ancestorIndex = ancestors.findIndex(a => a.equals(ancestor));
        const tillAncestor = ancestors.slice(0, ancestorIndex + 1);
        commits.push(...tillAncestor);

        return commits;
    }

    async changesTillAncestor(
        ancestor: Commit
    ){
        const ancestors = await this.listCommitsTillAncestor(ancestor);

        const changes: ICommitChange[] = ancestors.slice(0, ancestors.length)
            .reduce((acc: ICommitChange[], red: Commit) => {
                return [...acc, ...red.changes];
            }, []);

        return changes;
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