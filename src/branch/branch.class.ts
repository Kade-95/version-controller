import { Commit } from "../commit/commit.class";
import { Repository } from "../repository/repository.class";
import { Store } from "../store/store.class";
import { rollback } from "../change/rollback";
import { update } from "../change/update";
import { IBranch } from "./branch.interface";

export class Branch implements IBranch {
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
        await this.read();
        if (callback) callback(this);
    }

    async read(){
        this.content = await this.store.read({ name: this.name });    
            
        Object.keys(this.content || {}).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });

        return this.content;
    }

    async delete(){
        const activeBranch = (await this.repo.branch) as IBranch;
        if (activeBranch.name === this.name) throw new Error("You can not remove the active branch");
        if (this.name == this.repo.defaultBranch) throw new Error("You can not remove the default branch");

        this.repo.safetyCheck();
        this.store.delete({ _id: this._id });
    }

    async checkout(){
        this.repo.safetyCheck();

        const currentBranch = await Branch.from(this.repo, (await this.repo.branch as Branch).name);
        const currentCommit = await currentBranch.getCommit();

        const commit = await this.getCommit();
        const lastCommonAncestor = await currentCommit.lastCommonAncestor(commit) as Commit;

        const currentChanges = await currentCommit.changesTillAncestor(lastCommonAncestor);
        const changes = await commit.changesTillAncestor(lastCommonAncestor);

        console.log(`Rolling back ${currentChanges.length} changes`);
        const reverts = rollback(this.repo.data, currentChanges);

        console.log(`Writting back ${changes.length} changes`);
        const data = update(reverts, changes);

        await this.repo.store.update({ _id: this.repo._id }, { head: { branch: this._id, commit: this.commit_id }, data });
        await this.repo.read();

        console.log("Checkout is successful");
    }

    async getCommit(){
        const commit = await this.repo.commitStore.read({ _id: this.commit_id }) as Commit;                
        return Commit.from(this.repo, commit._id as string);
    }

    async commit(
        message: string
    ){
        const commit = await Commit.create(this.repo, message, this.commit_id as string) as Commit;
        await this.store.update({ _id: this._id }, { commit_id: commit._id });
        await this.read();
        return commit;
    }

    async revertLastCommit(){
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
            this.repo.board = update(this.repo.data, changes);

            await this.repo.add();
            await this.repo.stage();
            await Commit.create(this.repo, `Merged: '${incomingBranch.name}' into '${this.name}'`, commit._id as string, incomingCommit._id);
        }
    }

    static async create(
        repo: Repository<any>,
        name: string
    ){
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
        const exists = await repo.branchStore.read({ name });
        if (!exists) throw new Error("Branch does not exist");

        const branch = new Promise<Branch>((res) => new Branch(repo, name, res));
        return branch;
    }

    static async checkout(
        repo: Repository<any>,
        name: string
    ){
        const branch = await Branch.create(repo, name);
        await branch.checkout();
    }
}