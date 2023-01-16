import { IChange } from "../models/change.interface";

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