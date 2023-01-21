import { Commit } from "../commit/commit.class";
import { Repository } from "../repository/repository.class";
import { Store } from "../store/store.class";
import { modify } from "../change/modify";
import { IBranch } from "./branch.interface";

export class Branch implements IBranch {
    /**
    * @summary
    * Creates a Branch
    *
    * @param name - This is the name for the branch
    * @param {Repository<any>} repo - This is the repo that owns the branch
    * @param commit_id - This is the current branch's commit id
    * @param store - This is the storage for the branch details
    */

    private store: Store<IBranch>;
    private content: IBranch | undefined;

    _id?: string ;
    commit_id?: string;

    constructor(
        public repo: Repository<any>,
        public name: string,
        callback?: (branch: Branch) => void
    ){
       this.store = new Store(repo.name, 'branches');
       this.setup(callback);
    }

    private async setup(
        callback: any
    ){
        /**
        * @summary
        * An async function used to initialize the Branch class
        * 
        * @param callback - This is a callback function to execute after branch is setup
        */

        await this.read();
        if (callback) callback(this);
    }

    async read(){
        /**
        * @summary
        * Read the contents of the branch off the storage
        *
        */

        this.content = await this.store.read({ name: this.name });    
            
        Object.keys(this.content || {}).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });

        return this.content;
    }

    async delete(){
        /**
        * @summary
        * Deletes the branch from the repository
        *
        */

        const activeBranch = (await this.repo.branch) as IBranch;
        if (activeBranch.name === this.name) throw new Error("You can not remove the active branch");
        if (this.name == this.repo.defaultBranch) throw new Error("You can not remove the default branch");

        this.repo.safetyCheck();
        this.store.delete({ _id: this._id });
    }

    async checkout(){
        /**
        * @summary
        * Makes branch the active branch of the repository
        *
        */

        this.repo.safetyCheck();

        const currentBranch = await Branch.from(this.repo, (await this.repo.branch as Branch).name);
        const currentCommit = await currentBranch.getCommit();

        const commit = await this.getCommit();
        const lastCommonAncestor = await currentCommit.lastCommonAncestor(commit) as Commit;

        const currentChanges = await currentCommit.changesTillAncestor(lastCommonAncestor);
        const changes = await commit.changesTillAncestor(lastCommonAncestor);

        console.log(`Rolling back ${currentChanges.length} changes`);
        const reverts = modify(this.repo.data, currentChanges, 'rollback');

        console.log(`Writting back ${changes.length} changes`);
        const data = modify(reverts, changes, 'update');

        await this.repo.store.update({ _id: this.repo._id }, { head: { branch: this._id, commit: this.commit_id }, data });
        await this.repo.read();

        console.log("Checkout is successful");
    }

    async getCommit(){
        /**
        * @summary
        * Get the current branch commit as a Commit class
        *
        */

        const commit = await this.repo.commitStore.read({ _id: this.commit_id }) as Commit;                
        return Commit.from(this.repo, commit._id as string);
    }

    async commit(
        message: string
    ){
        /**
        * @summary
        * Commits the changes in the branch
        * 
        * @param message - A note describing the commit
        *
        */

        const commit = await Commit.create(this.repo, message, this.commit_id as string) as Commit;
        await this.store.update({ _id: this._id }, { commit_id: commit._id });
        await this.read();
        return commit;
    }

    async revertLastCommit(){
        /**
        * @summary
        * Reverts the last commit for the branch to the commits ancestor
        *
        */

        const { changes: commitChanges, ancestor } = await this.getCommit();
        if (!ancestor) throw new Error("No previous commit found");

        this.commit_id = ancestor;
        const changes = commitChanges.filter(c => !this.repo.changes.find(a => (
            JSON.stringify(a.path) === JSON.stringify(c.path)
        )));
        this.repo.changes.push(...changes);

        const head = { commit: this.commit_id, branch: this._id };

        this.repo.store.update({ _id: this.repo._id }, { head, changes: this.repo.changes })
    }

    async merge(
        name: string
    ){
        /**
        * @summary
        * Merges a branch to this branch
        *
        * @param name - Name of the branch to merge
        */

        const incomingBranch = await Branch.from(this.repo, name);    
        const incomingCommit = await incomingBranch.getCommit();

        const commit = await this.getCommit();
        const lastCommonAncestor = await incomingCommit.lastCommonAncestor(commit);
        
        if (!lastCommonAncestor) {
            throw new Error("Branch is not related");
        }
        else if (await incomingCommit.isAncestor(commit)) {
            throw new Error("Branch is behind in history");
        }
        else if (commit.equals(incomingCommit)){
            console.log("Branch upto date, no merge done");
            return;
        }
        else if (await commit.isAncestor(incomingCommit)) {
            await this.repo.store.update({ _id: this.repo._id }, {
                head: { ...this.repo.head, commit: incomingCommit._id }
            });
            await this.store.update({ _id: this._id }, { commit_id: incomingCommit._id });
            await this.read();
            await this.repo.read();
        }
        else {
            const changes = (await incomingCommit.changesTillAncestor(lastCommonAncestor)).reverse();
            console.log(`Writing ${changes.length} changes`);
            this.repo.board = modify(this.repo.data, changes, 'update');

            await this.repo.add();
            await this.repo.stage();
            await Commit.create(this.repo, `Merged: '${incomingBranch.name}' into '${this.name}'`, commit._id as string, incomingCommit._id);
        }
    }

    static async create(
        repo: Repository<any>,
        name: string
    ){
         /**
        * @summary
        * A function to create a new branch
        *
        * @param name - This is the name of the new branch
        * @param {Repository<any>} repo - This is the repo that owns the branch
        */

        const existing = await repo.branchStore.read({ name });
        if (existing) throw new Error('Branch already exists');

        const currentCommit = repo.head.commit;        
        await repo.branchStore.insert({ name, commit_id: currentCommit });

        return Branch.from(repo, name);
    }

    static async from(
        repo: Repository<any>,
        name: string
    ){
        /**
        * @summary
        * A function to create branch from an existing branch data
        *
        * @param name - This is the name of the new branch
        * @param {Repository<any>} repo - This is the repo that owns the branch
        */

        const exists = await repo.branchStore.read({ name });
        if (!exists) throw new Error("Branch does not exist");

        const branch = new Promise<Branch>((res) => new Branch(repo, name, res));
        return branch;
    }

    static async checkout(
        repo: Repository<any>,
        name: string
    ){
        /**
        * @summary
        * Makes a branch active in the repository
        *
        * @param name - This is the name of the branch to checkout
        * @param {Repository<any>} repo - This is the repo that owns the branch
        */

        const branch = await Branch.create(repo, name);
        await branch.checkout();
    }
}