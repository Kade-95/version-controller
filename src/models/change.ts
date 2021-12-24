import { ChangeTypes } from "./change.types";

export interface Change {
    path: any[];
    type: ChangeTypes;
    before: any;
    after: any;
}