import { IChange } from "../models/change";

export interface ICommitChange extends IChange {
    value: any;
}

export interface ICommit {
    ancestor: string;
    merged?: string;
    message: string;
    changes: ICommitChange[];
    _id?: string;
}