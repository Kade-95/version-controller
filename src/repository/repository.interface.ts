import { IBranch } from "../branch/branch.interface";
import { ICommit } from "../commit/commit.interface";
import { IChange } from "../models/change.interface";
import { IHead } from "../models/head.interface";

export interface IRepository<T = any> {
    name: string;
    readonly data: T;
    readonly head: IHead;
    readonly changes: IChange[];
    readonly staged: IChange[];
    defaultBranch: string;
    readonly _id?: string;
}