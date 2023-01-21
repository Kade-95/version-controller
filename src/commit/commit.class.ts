import { Repository } from "../repository/repository.class";
import { Store } from "../store/store.class";
import { retrieve } from "../change/retrieve";
import { ICommit, ICommitChange } from "./commit.interface";

export class Commit implements ICommit {
    /**
    * @summary
    * Creates a Commit
    *
    * @param message - This is the description of the commit
    * @param repo - This is the repo that owns the commit
    * @param ancestor - This is the commit before this commit
    * @param merged - This is the commit that is merged into the ancestor commit
    * @param changes - This is the changes within this commit
    * @param store - This is the storage for the commit details
    */

    private store: Store<ICommit>;
    private content: ICommit | undefined;
    
    changes: ICommitChange[] = [];
    message: string = ''; 
    ancestor: string = '';
    merged?: string;

    constructor(
        private repo: Repository<any>,
        public _id: string,
        callback?: (branch: Commit) => void
    ) {
        this.store = new Store(this.repo.name, 'commits');        
        this.setup(callback);
    }

    private async setup(
        callback: any
    ){        
        /**
        * @summary
        * An async function used to initialize the Commit class
        * 
        * @param callback - This is a callback function to execute after commit is setup
        */
        await this.read();
        if (callback) callback(this);
    }

    async read(){
         /**
        * @summary
        * Read the contents of the commit off the storage
        *
        */

        this.content = await this.store.read({ _id: this._id });
        Object.keys(this.content || {}).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });

        return this.content;
    }

    async ancestory(){
         /**
        * @summary
        * Used to get list of all commits that came before this commit starting from the base commit
        *
        */

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
         /**
        * @summary
        * Check if a commit is same as this commit
        * 
        * @param {ICommit} commit - The details of the commit
        *
        */

        return this._id === commit._id;
    }

    async isAncestor(
        commit: Commit
    ){
        /**
        * @summary
        * Check if a this commit is an ancestor of a commit
        * 
        * @param {Commit} commit - The details of the commit
        */

        const childAncestory = await commit.ancestory();
        return !!childAncestory.find(a => a._id == this._id);
    }

    async lastCommonAncestor(
        commit: Commit
    ){
        /**
        * @summary
        * Gets the last common ancestor between this commit and another commit
        * 
        * @param {Commit} commit - The details of the commit
        */

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
        /**
        * @summary
        * Get's all the commits till a particular ancestor commit
        * 
        * @param {Commit} ancestor - The details of the commit
        */
       
        const commits: Commit[] = [];        
        if (!await ancestor.isAncestor(this) && !this.equals(ancestor)){
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
        /**
        * @summary
        * Get's all the changes till a particular ancestor commit
        * 
        * @param {Commit} ancestor - The details of the commit
        */

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
        /**
        * @summary
        * A function to create a new commit
        *
        * @param message - This is the description of the commit
        * @param {Repository<any>} repo - This is the repo that owns the commit
        * @param ancestor - This is the commit before this commit
        * @param merged - This is the commit that is merged into the ancestor commit
        */

        if (!repo.staged.length && repo._id) return;

        let changes: ICommitChange[] = [];
        for (const item of repo.staged) {
            changes.push({ ...item, value: retrieve(repo.board, item.path) });
        }

        const data = {
            message: message, changes, ancestor: ancestor, merged: merged
        };
        const commit = await repo.commitStore.insert(data); 

        repo.head.commit = commit._id;
        repo.staged = [];        
                
        return Commit.from(repo, commit._id);
    }

    static async from(
        repo: Repository<any>,
        _id: string
    ){
        /**
        * @summary
        * A function to create commit from an existing commit data
        *
        * @param _id - This is the _id of the commit
        */

        const exists = await repo.commitStore.read({ _id });        
        if (!exists) throw new Error("Commit does not exist");

        return new Promise<Commit>((res, _) => new Commit(repo, _id, res));
    }
}