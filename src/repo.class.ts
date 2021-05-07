import { v4 as uuidV4 } from "uuid";

import { LocalDB } from "./local.storage";
import { Branch } from "./models/branch.interface";
import { Commit, CommitChange } from "./models/commit.model";
import { Change, changes } from "./shared/changes";
import { retrieve } from "./shared/retrieve";
import { update } from "./shared/update";

export interface IRepo<T> {
    readonly _id: string;
    readonly data: T;
    readonly head: string;
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
    private store: LocalDB<IRepo<T>>;
    private board: T;

    changes: Change[] = [];
    commits: Commit[] = [];
    merged: string[] = [];
    staged: Change[] = [];
    head: string;
    branches: Branch[] = [];
    time: Date = new Date();
    _id: string;

    initialized: boolean;

    constructor(public name: string, readonly data: T = undefined) {
        this.store = new LocalDB<IRepo<T>>("Repos");
        this.read();

        if (!this.initialized) this.initialize();

        const temp = JSON.parse(JSON.stringify(this.data));
        this.board = update(this.data, this.changes);
        this.data = temp;
    }

    private initialize() {
        this.initialized = true;
        this.commit("Base Commit");
        this.createBranch("main");

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

        this.write();
    }

    private write() {
        this.store.insertOne(this.content);
    }

    private read() {
        this.content = this.store.findOne({ name: this.name });
        if (this.content) {
            Object.keys(this.content).map(k => {
                (this as any)[k] = (this.content as any)[k];
            });
        }

        this.initialized = !!this.content;
    }

    save(data: T) {
        this.board = data;
        this.changes = changes(this.data, this.board, { bi: true });
        this.store.updateOne({ _id: this._id }, { changes: this.changes });
    }

    createBranch(name: string) {
        const branch: Branch = { name, time: new Date(), commit: this.head, _id: uuidV4() };
        this.branches.push(branch);

        return branch;
    }

    deleteBranch(_id: string) {

    }

    stage(paths?: string[][]) {
        // Each dir is a string
        // Each path is a list of string or a single string(dir)
        // There for paths is a list of strings or a list of list of strings

        if (!this.changes.length) return;

        if (paths) {
            for (const path of paths) {
                const isChanged = this.changes.find(c => JSON.stringify(c.path) == JSON.stringify(path));
                if (isChanged) {
                    this.staged = Array.from(new Set([...this.staged, isChanged]));
                    this.changes = this.changes.filter(c => JSON.stringify(c.path) != JSON.stringify(path));
                }
            }
        }
        else {
            this.staged = Array.from(new Set([...this.staged, ...this.changes]));
            this.changes = [];
        }

        this.store.updateOne({ _id: this._id }, { staged: this.staged, changes: this.changes });
    }

    commit(message: string, origin: string = this.head) {
        if (!this.staged.length) return;

        let changes: CommitChange[] = [];
        for (const s of this.staged) {
            changes.push({ ...s, value: retrieve(this.data, s.path) })
        }

        const commit: Commit = {
            _id: uuidV4(), message, changes, origin, time: new Date()
        };

        this.commits.push(commit);
        this.head = commit._id;
        this.staged = [];

        this.store.updateOne({ _id: this._id }, { commits: this.commits, staged: this.staged });
    }

    push() {

    }

    pull() {

    }

    status() {

    }

    log() {

    }

    clone() {

    }

    diff() {

    }

    merge() {

    }
}