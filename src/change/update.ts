import { IChange } from "../models/change.interface";
import { ChangeEnum } from "../models/change.enum";

export function update(current: any, changes: IChange[]) {
    const temp = JSON.parse(JSON.stringify(current));

    const data = (block: any, at: any) => {
        return block[at];
    }

    for (let c of changes) {
        let attr = temp;

        for (let i = 0; i < c.path.length; i++) {
            if (i == c.path.length - 1) {                
                if (c.type == ChangeEnum.REMOVED) {
                    delete attr[c.path[i]]
                }
                else {                    
                    attr[c.path[i]] = c.after;
                }
            }
            else {
                attr = data(attr, c.path[i]);
            }
        }
    }

    return temp;
}