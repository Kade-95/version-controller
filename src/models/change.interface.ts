import { ChangeEnum } from "./change.enum";

export interface IChange {
    path: any[];
    type: ChangeEnum;
    before: any;
    after: any;
}