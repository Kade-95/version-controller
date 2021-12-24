import { Change } from "./change";
import { Branch } from "./branch";
import { Commit } from "./commit.model";
import { Head } from "./head";

export interface Repo<T = any> {
    readonly data: T;
    readonly head: Head;
    readonly branches: Branch[];
    readonly changes: Change[];
    readonly staged: Change[];
    readonly commits: Commit[];
    readonly merged: string[];
    readonly time: Date;
    _id: string;
    name: string;
}