import { Branch } from "../models/branch";
import { Change } from "../models/change";
import { Commit, CommitChange } from "../models/commit.model";
import { Head } from "../models/head";
import { Repo } from "../models/repo";
import { Store } from "./repo.database";
import { v4 as uuidV4 } from 'uuid';
import { retrieve } from "../utils/retrieve";
import { getChanges } from "../utils/getChanges";
import { rollback } from "../utils/rollback";
import { update } from "../utils/update";

export class SSSSS<T> implements Repo<T> {
    private store: Store = new Store();
    private content: Repo<T> | undefined;

    changes: Change[] = [];
    commits: Commit[] = [];
    merged: string[] = [];
    staged: Change[] = [];
    branches: Branch[] = [];
    time: Date = new Date();
    head: Head = { };
    readonly _id = uuidV4();

    initialized: boolean = false;
    board: T | undefined;

    get details() {
        const branch = this.branches.find(b => b._id == this.head.branch)?.name;
        const nBranch = this.branches.length;
        const nChanges = this.changes.length;
        const nStaged = this.staged.length;
        const commit = this.commits.find(c => c._id == this.head.commit);
        // const nCommits = this.commitAncestory(commit).length + 1;
        const head = this.head;
        return { branch, nBranch, nChanges, nStaged, commit, head };
    }

    constructor(
        public name: string,
        readonly data: T,
        callback?: (repo: Repo<T>) => { }
    ) {
        this.read().then(async () => {
            if (!this.initialized) await this.initialize();
            this.board = JSON.parse(JSON.stringify(this.data || null));

            if (callback) callback(this);
        });
    }

    private isSafe() {
        // Check there are staged or commited changes
        if (this.details.nChanges) throw new Error("Unstaged Changes");
        if (this.details.nStaged) throw new Error("Uncommited Changes");
    }

    private async read() {
        // Read the stored content
        this.content = await this.store.read({ name: this.name });

        // Set repo with the stored content
        if (this.content) {
            Object.keys(this.content).map(k => {
                (this as any)[k] = (this.content as any)[k];
            });

            this.initialized = true;
        }
    }

    private async initialize() {
        //Initialize repo with first commit, branch and the head, then checkout the branch and commit
        this.commit("Initial Commit");
        const branch = await this.createBranch("main");
        this.head.branch = branch._id;

        //Set the initial content
        this.content = {
            _id: uuidV4(),
            name: this.name,
            changes: this.changes,
            commits: this.commits,
            branches: this.branches,
            staged: this.staged,
            head: this.head,
            time: this.time,
            merged: [],
            data: this.data
        };

        //Create the repo
        await this.store.insert(this.content);
        this.initialized = true;
    }

    async save() {
        const changes = getChanges(this.data, this.board, { bi: true });

        for (const i in changes) {
            this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(changes[i].path));
            this.changes.push(changes[i]);
        }

        await this.store.update({ _id: this._id }, { changes: this.changes, data: this.board });
        await this.read();
    }

    async commit(
        message: string, 
        ancestor: string = this.head.commit as string, 
        merged: string | undefined = undefined
    ) {
        if (!this.staged.length && this.initialized) return;

        let changes: CommitChange[] = [];
        for (const s of this.staged) {
            changes.push({ ...s, value: retrieve(this.board, s.path) })
        }

        const commit: Commit = {
            _id: uuidV4(), message, changes, ancestor, merged, time: new Date()
        };

        this.commits.push(commit);
        this.head.commit = commit._id;
        this.staged = [];

        this.branches = this.branches.map(b => {
            if (b._id == this.head.branch) {
                b.commit = this.head.commit as string;
            }

            return b;
        });

        await this.store.update({ _id: this._id }, { commits: this.commits, staged: this.staged, head: this.head, branches: this.branches });
    }

    async createBranch(
        name: string
    ) {
        const found = this.branches.find(b => b.name == name);
        if (found) throw new Error(`Branch with name '${name}' already exists in this repo`);

        const branch: Branch = { name, time: new Date(), commit: this.head.commit as string, _id: uuidV4() };
        this.branches.push(branch);

        await this.store.update({ _id: this._id }, { branches: this.branches });
        return branch;
    }

    async deleteBranch(name: string) {
        if (name == this.details.branch) throw new Error("You can not remove the active branch");
        if (name == 'main') throw new Error("You can not remove the Main branch");
        this.isSafe();

        this.branches = this.branches.filter(b => b.name != name);
        await this.store.update({ _id: this._id }, { branches: this.branches });
    }

    private commitAncestory(commit: Commit) {
        let ancestors: Commit[] = [];
        const history: string[] = [];
        commit.ancestor && history.push(commit.ancestor);
        commit.merged && history.push(commit.merged);

        if (history.length) {
            const historyCommit: Commit[] = history.map(h => this.commits.find(c => c._id == h) as Commit);

            ancestors.push(
                ...historyCommit,
                ...historyCommit.reduce((acc: Commit[], commit: Commit) => {
                    return [...acc, ...this.commitAncestory(commit)];
                }, [])
            );
        }
        return ancestors;
    }

    private equalCommits(first: Commit, second: Commit) {
        return first._id == second._id;
    }

    private commitToAncestor(child: Commit, ancestor: Commit) {
        const commits: Commit[] = [];

        if (!this.isCommitAncestory(ancestor, child) && !this.equalCommits(child, ancestor)) {
            return [];
        }
        commits.push(child);

        const ancestors = this.commitAncestory(child);
        const ancestorIndex = ancestors.findIndex(a => a._id == ancestor._id);
        const tillAncestor = ancestors.slice(0, ancestorIndex + 1);

        commits.push(...tillAncestor);
        return commits;
    }

    private commitHistoryTillAncestor(child: Commit, ancestor: Commit) {
        const changes: CommitChange[] = [];

        const ancestory = this.commitToAncestor(child, ancestor);
        changes.push(
            ...ancestory.slice(0, ancestory.length)
                .reduce((acc: CommitChange[], commit: Commit) => {
                    return [...acc, ...commit.changes];
                }, [])
        );

        return changes;
    }

    private isCommitAncestory(parent: Commit, child: Commit) {
        const childAncestory = this.commitAncestory(child);
        return !!childAncestory.find(a => a._id == parent._id);
    }

    private commitsLastCommonAncestor(first: Commit, second: Commit) {
        const firstHistorys = this.commitAncestory(first).reverse();
        const secondHistorys = this.commitAncestory(second).reverse();

        let last: Commit | undefined;
        if (first._id == second._id) last = first;
        else if (this.isCommitAncestory(first, second)) last = first;
        else if (this.isCommitAncestory(second, first)) last = second;
        else {
            for (const a in firstHistorys) {
                for (const b in secondHistorys) {
                    if (firstHistorys[a] === secondHistorys[b]) last = firstHistorys[a];
                    if (last) break;
                }
                if (last) break;
            }
        }

        return last;
    }

    async branchAndCheckout(name: string) {
        await this.createBranch(name);
        this.checkout(name);
    }

    async checkout(name: string) {

        this.isSafe();

        // get current and incoming branches
        const currentBranch = this.branches.find(b => b._id == this.head.branch) as Branch;
        const incomingBranch = this.branches.find(b => b.name == name) as Branch;

        // check if incoming branch is existing
        if (!incomingBranch) throw new Error("Unknown branch");
        console.log(`Checkout from ${currentBranch.name} to ${incomingBranch.name}`);

        //get current commit and incoming commits
        const currentCommit = this.commits.find(c => c._id == currentBranch.commit) as Commit;
        const incomingCommit = this.commits.find(c => c._id == incomingBranch.commit) as Commit;

        // get last commits ancestor
        const lastCommitAncestor = this.commitsLastCommonAncestor(currentCommit, incomingCommit) as Commit;

        // get the changes to revert and to write
        const reverts = this.commitHistoryTillAncestor(currentCommit, lastCommitAncestor);
        const changes = this.commitHistoryTillAncestor(incomingCommit, lastCommitAncestor).reverse();

        console.log(`Rolling back ${reverts.length} changes`);
        const reverted = rollback(this.data, reverts);

        console.log(`Writing ${changes.length} changes`);
        const updated = update(reverted, changes);

        this.head.branch = incomingBranch._id;
        this.head.commit = incomingBranch.commit;

        await this.store.update({ _id: this._id }, { head: this.head, data: updated });
        await this.read();

        console.log("Checkout is successful");
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

    async revertLastCommit() {
        const { commit } = this.details;
        const { changes, ancestor } = commit as Commit;

        if (!ancestor) throw new Error("No previous commit found");
        const branch = this.branches.find(b => b._id == this.head.branch) as Branch;

        branch.commit = ancestor;
        this.head.commit = ancestor;
        this.changes.push(
            ...changes.filter(c => !this.changes.find(a => (JSON.stringify(a.path) == JSON.stringify(c.path))))
        );

        await this.store.update({ _id: this._id }, { branches: this.branches, head: this.head, changes: this.changes });
    }

    async merge(name: string) {
        const currentBranch = this.branches.find(b => b._id == this.head.branch);
        const incomingBranch = this.branches.find(b => b.name == name);
        if (!incomingBranch) throw new Error("Unknown branch");

        const currentCommit = this.commits.find(c => c._id == this.head.commit) as Commit;
        const incomingCommit = this.commits.find(c => c._id == incomingBranch.commit) as Commit;
        const lastCommitAncestor = this.commitsLastCommonAncestor(currentCommit, incomingCommit) as Commit;

        if (!lastCommitAncestor) {
            throw new Error("Branch is not related");
        }
        else if (this.isCommitAncestory(incomingCommit, currentCommit)) {
            throw new Error("Branch is behind in history");
        }
        else if (this.equalCommits(incomingCommit, currentCommit)) {
            console.log("Branch upto date, no merge done");
            return;
        }
        else if (this.isCommitAncestory(currentCommit, incomingCommit)) {
            this.head.commit = incomingCommit._id;
            if (currentBranch) currentBranch.commit = this.head.commit;
            await this.store.update({ _id: this._id }, { head: this.head, branches: this.branches });
        }
        else {
            // get the changes to write
            const changes = this.commitHistoryTillAncestor(incomingCommit, lastCommitAncestor).reverse();
            console.log(`Writing ${changes.length} changes`);
            this.board = update(this.data, changes);

            await this.save();
            await this.stage();
            await this.commit(`${currentCommit.message} & ${incomingCommit.message}`, currentCommit._id, incomingCommit._id);
        }
    }

    async clone(target: string, name: string) {
        const repo = await this.store.read({ name: target });
        if (!repo) throw new Error("Repo doesn't exist locally");

        const found = await this.store.read({ name });
        if (found) throw new Error(`Repo with name "${name}" already exists`);

        repo.name = name;
        repo._id = uuidV4();
        await this.store.insert(repo);

        return repo;
    }
}