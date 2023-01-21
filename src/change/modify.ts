import { IChange } from "../models/change.interface";
import { ChangeEnum } from "../models/change.enum";
import { retrieve } from "./retrieve";

export function modify(
    data: any, 
    changes: IChange[],
    direction: 'update' | 'rollback'
) {   
    /**
     * @summary
     * This is used to update changes into a data
     * 
     * @param data - This is the current data
     * @param changes - This is the list of changes to be add into the data
     */

    const temp = JSON.parse(JSON.stringify(data));

    for (let c of changes) {
        let attr = temp;

        for (let i = 0; i < c.path.length; i++) {
            if (i == c.path.length - 1) {                
                if (direction == 'update' && c.type == ChangeEnum.REMOVED) {
                    delete attr[c.path[i]]
                }
                else if (direction === 'rollback' && c.type == ChangeEnum.ADDED) {
                    delete attr[c.path[i]]
                }
                else {                    
                    attr[c.path[i]] = direction == 'update' ? c.after : c.before;
                }
            }
            else {
                attr = retrieve(attr, [c.path[i]]);
            }
        }
    }

    return temp;
}