import { Change } from "./change";

export interface CommitChange extends Change {
    value: any;
}

export interface Commit {
    _id: string;
    time: Date;
    ancestor: string;
    merged?: string;
    message: string;
    changes: CommitChange[];
}