import { Change } from "../shared/changes";

export interface CommitChange extends Change {
    value: any;
}

export interface Commit {
    _id: string;
    time: Date;
    history: string[];
    message: string;
    changes: CommitChange[];
}