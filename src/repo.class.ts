import { v4 as uuidV4 } from "uuid";

import { LocalDB } from "./local.storage";
import { Branch } from "./models/branch.interface";
import { Commit, CommitChange } from "./models/commit.model";
import { insertFunction, readFunction, RepoDatabase, updateFunction } from "./repo.database";
import { Change, ChangeTypes, getChanges } from "./shared/changes";
import { retrieve } from "./shared/retrieve";
import { update } from "./shared/update";

export interface RepoHead {
    commit: string;
    branch?: string;
}

export interface IRepo<T = any> {
    readonly _id: string;
    readonly data: T;
    readonly head: RepoHead;
    readonly branches: Branch[];
    readonly changes: Change[];
    readonly staged: Change[];
    readonly commits: Commit[];
    readonly merged: string[];
    name: string;
    readonly time: Date;
}

export class Repo<T> implements IRepo<T> {
    private content: IRepo<T>;

    changes: Change[] = [];
    commits: Commit[] = [];
    merged: string[] = [];
    staged: Change[] = [];
    head: RepoHead = { commit: undefined };
    branches: Branch[] = [];
    time: Date = new Date();
    _id: string;

    initialized: boolean;
    board: T;

    get details() {
        const branch = this.branches.find(b => b._id == this.head.branch)?.name;
        const nBranch = this.branches.length;
        const nChanges = this.changes.length;
        const nStaged = this.staged.length;
        const commit = this.commits.find(c => c._id == this.head.commit);
        const nCommits = this.commitAncestors(commit).length + 1;
        return { branch, nBranch, nChanges, nStaged, commit, nCommits };
    }

    constructor(
        public name: string,
        readonly data: T = null,
        private database: RepoDatabase<T> = { insert: insertFunction, read: readFunction, update: updateFunction }
    ) { }

    private async initialize() {
        //Initialize repo with first commit, branch and the head, then checkout the branch and commit
        this.commit("Initial Commit");
        this.createBranch("main");
        this.checkout("main");

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
        await this.insert();
        this.initialized = true;
    }

    private async insert() {
        return await this.database.insert(this.content);
    }

    private async read() {
        // Read the stored content
        this.content = await this.database.read({ name: this.name });

        // Set repo with the stored content
        if (this.content) {
            Object.keys(this.content).map(k => {
                (this as any)[k] = (this.content as any)[k];
            });

            this.initialized = true;
        }
    }

    private commitAncestors(commit: Commit) {
        let ancestors: Commit[] = [];
        const { parents } = commit;

        if (parents) {

            const parentCommit = this.commits.reverse().find(c => {
                return c._id == parents.ancestor || c._id == parents.merged;
            });

            if (parentCommit) ancestors = [parentCommit, ...this.commitAncestors(parentCommit)]
        }

        return ancestors;
    }

    private isAncestorCommit(ancestor: Commit, child: Commit) {
        const childAncestors = this.commitAncestors(child);
        return childAncestors.find(a => a._id == ancestor._id);
    }

    private commitsLastCommonAncestor(first: Commit, second: Commit) {
        const firstAncestors = this.commitAncestors(first);
        const secondAncestors = this.commitAncestors(second);

        let ancestor: Commit;

        if (this.isAncestorCommit(first, second)) ancestor = first;
        else if (this.isAncestorCommit(second, first)) ancestor = second;
        else {
            for (const a in firstAncestors) {
                for (const b in secondAncestors) {
                    if (firstAncestors[a] === secondAncestors[b]) ancestor = firstAncestors[a];
                    if (ancestor) break;
                }
                if (ancestor) break;
            }
        }

        return ancestor;
    }

    async onload(callback = (repo: Repo<T>) => { }) {
        await this.read();
        if (!this.initialized) await this.initialize();
        this.board = JSON.parse(JSON.stringify(this.data || null));

        callback(this);
    }

    async save() {
        const changes = getChanges(this.data, this.board, { bi: true });

        for (const i in changes) {
            this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(changes[i].path));
            this.changes.push(changes[i]);
        }

        await this.database.update({ _id: this._id }, { changes: this.changes, data: this.board });
    }

    async createBranch(name: string) {
        const found = this.branches.find(b => b.name == name);
        if (found) throw new Error(`Branch with name '${name}' already exists in this repo`);

        const branch: Branch = { name, time: new Date(), commit: this.head.commit, _id: uuidV4() };
        this.branches.push(branch);

        await this.database.update({ _id: this._id }, { branches: this.branches });
    }

    async deleteBranch(name: string) {
        if (name == 'main') throw new Error("You can not remove the Main branch");

        this.branches = this.branches.filter(b => b.name != name);
        await this.database.update({ _id: this._id }, { branches: this.branches });
    }

    async branchAndCheckout(name: string) {
        await this.createBranch(name);
        this.checkout(name);
    }

    async checkout(name: string) {
        if (this.details.nChanges) throw new Error("Unstaged Changes");
        if (this.details.nStaged) throw new Error("Uncommited Changes");

        const branch = this.branches.find(b => b.name == name);
        if (!branch) throw new Error("Unknown branch");

        this.head.branch = branch._id;
        await this.database.update({ _id: this._id }, { head: this.head });
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

        await this.database.update({ _id: this._id }, { staged: this.staged, changes: this.changes });
    }

    async commit(message: string, ancestor: string = this.head.commit) {
        if (!this.staged.length && this.initialized) return;

        let changes: CommitChange[] = [];
        for (const s of this.staged) {
            changes.push({ ...s, value: retrieve(this.board, s.path) })
        }

        const commit: Commit = {
            _id: uuidV4(), message, changes, parents: { ancestor }, time: new Date()
        };

        this.commits.push(commit);
        this.head.commit = commit._id;
        this.staged = [];

        await this.database.update({ _id: this._id }, { commits: this.commits, staged: this.staged, head: this.head });
    }

    async merge(name: string) {
        const currentBranch = this.branches.find(b => b._id == this.head.branch);
        const incomingBranch = this.branches.find(b => b.name == name);
        if (!incomingBranch) throw new Error("Unknown branch");

        const currentCommit = this.commits.find(c => c._id == this.head.commit);
        const incomingCommit = this.commits.find(c => c._id == incomingBranch.commit);

        const changes = getChanges(currentCommit.changes, incomingCommit.changes, { bi: true });
        if (!changes.length) {
            console.log("No difference found");
            return;
        }

        if (this.isAncestorCommit(currentCommit, incomingCommit)) {
            this.head.commit = incomingCommit._id;
            if (currentBranch) currentBranch.commit = this.head.commit;
            await this.database.update({ _id: this._id }, { head: this.head, branches: this.branches });
        }
        else if (this.isAncestorCommit(incomingCommit, currentCommit)) {
            throw new Error("Branch is behind");
        }
        else if (!this.commitsLastCommonAncestor(currentCommit, incomingCommit)) {
            throw new Error("Branch is not related");
        }
        else {
            update(this.board, incomingCommit.changes);
            this.save();
            this.stage();
            this.commit("");
        }
    }

    diff() {

    }

    push(to: string, origin: string, branch: string) {

    }

    pull(from: string) {

    }

    status() {

    }

    log() {

    }

    clone() {

    }
}