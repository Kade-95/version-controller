import { ChangeEnum } from "../models/change.enum";
import { IChange } from "../models/change.interface";

export function getChanges(
    original: any, 
    modified: any, 
    options?: { path?: string[], bi?: boolean, flip?: boolean }
) {
    /**
     * @summary
     * Gets changes between 2 objects
     * 
     * @param original - This is the original data
     * @param modified - This is the updated version of the original data
     * @param options - This is the settings used to get the changes
     * @param options.path - This is the path to look for changes
     * @param options.bi - This is a flag to look for changes bi-directionally
     * @param options.flip - This is a flag flip the original and modified
     */

    const lChanges: IChange[] = [];
    const path = options?.path || [];    
    
    original = original || {};
    modified = modified || {};

    for (const i in original) {
        const after = (options?.flip) ? original[i] : modified[i];
        const before = (options?.flip) ? modified[i] : original[i];        

        if (!modified?.hasOwnProperty(i)) {
            lChanges.push({ path: [...path, i], type: (options?.flip) ? ChangeEnum.ADDED : ChangeEnum.REMOVED, before, after });
        }
        else if (typeof original[i] == "object") {      
            const changes = getChanges(original[i], modified[i], { path: [...path, i], flip: options?.flip });    
            const extract = changes.map(change => {                
                return { ...change, path: change.path.filter((p, i) => (p !== path[i]))};
            });
            lChanges.push(...extract);              
        }
        else if (original[i] !== modified[i]) {
            lChanges.push({ path: [...path, i], type: ChangeEnum.MUTATED, before, after });
        }
    }
    
    if (options?.bi) {        
        const rChanges = getChanges(modified, original, { flip: true }); 
               
        for (const rC of rChanges) {
            const checked = lChanges.find(c => JSON.stringify(c.path) == JSON.stringify(rC.path));
            if (!checked) lChanges.push(rC);
        }
    }    
    return lChanges;
}