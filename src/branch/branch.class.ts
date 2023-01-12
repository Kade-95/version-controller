import { Repository } from "../repository/repository.class";
import { Store } from "../store/store.class";
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
}