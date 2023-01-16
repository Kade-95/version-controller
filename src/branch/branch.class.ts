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
    commit?: string;

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
        await this.read()
        if (callback) callback(this);
    }

    private async read(){
        this.content = await this.store.read({ name: this.name });
        Object.keys(this.content as object).map(k => {
            (this as any)[k] = (this.content as any)[k];
        });
    }

    async remove(){
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

        await this.repo.store.update({ _id: this.repo._id }, { head: { branch: this._id, commit: this.commit }, data });
        await this.repo.read();

        console.log("Checkout is successful");
    }

    async getCommit(){
        const commit = await this.repo.commitStore.read({ _id: this.commit }) as Commit;
        return Commit.from(this.repo, commit._id as string);
    }

    async revertLastCommit(){
        const { changes: commitChanges, ancestor } = await this.getCommit();
        if (!ancestor) throw new Error("No previous commit found");

        this.commit = ancestor;
        const changes = commitChanges.filter(c => !this.repo.changes.find(a => (
            JSON.stringify(a.path) === JSON.stringify(c.path)
        )));
        this.repo.changes.push(...changes);

        const head = { commit: this.commit, branch: this._id };

        this.repo.store.update({ _id: this.repo._id }, { head, changes: this.repo.changes })
    }

    async merge(
        name: string
    ){
        const incomingBranch = await Branch.from(this.repo, name);
        const incomingCommit = await incomingBranch.getCommit();
        if (!incomingBranch) throw new Error("Unknown branch");

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
            await this.store.update({ _id: this._id }, { commit: incomingCommit._id });
            await this.read();
            await this.repo.read();
        }
        else {
            const changes = (await incomingCommit.changesTillAncestor(lastCommonAncestor)).reverse();
            console.log(`Writing ${changes.length} changes`);
            this.repo.board = update(this.repo.data, changes);

            await this.repo.save();
            await this.repo.stage();
            await Commit.create(this.repo, `Merged: '${incomingBranch.name}' into '${this.name}'`, commit._id as string, incomingCommit._id);
        }
    }

    static async create(
        repo: Repository<any>,
        name: string
    ){
        const currentCommit = repo.head.commit;
        await repo.branchStore.insert({ name, commit: currentCommit });

        return Branch.from(repo, name);
    }

    static from(
        repo: Repository<any>,
        name: string
    ){
        return new Promise<Branch>((res) => new Branch(repo, name, res));
    }

    static async checkout(
        repo: Repository<any>,
        name: string
    ){
        const branch = await Branch.create(repo, name);
        await branch.checkout();
    }
}