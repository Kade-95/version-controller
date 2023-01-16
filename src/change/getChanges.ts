import { ChangeEnum } from "../models/change.enum";
import { IChange } from "../models/change.interface";

export function getChanges(
    original: any, 
    modified: any, 
    options?: { path?: string[], bi?: boolean, halphed?: boolean }
) {
    const lChanges: IChange[] = [];
    const path = options?.path || [];    
    
    original = original || {};
    modified = modified || {};

    for (const i in original) {
        const after = (options?.halphed) ? original[i] : modified[i];
        const before = (options?.halphed) ? modified[i] : original[i];

        if (!modified?.hasOwnProperty(i)) {
            lChanges.push({ path: [...path, i], type: (options?.halphed) ? ChangeEnum.ADDED : ChangeEnum.REMOVED, before, after });
        }
        else if (typeof original[i] == "object") {      
            const changes = getChanges(original[i], modified[i], { path: [...path, i] });    
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
        const rChanges = getChanges(modified, original, { halphed: true });

        for (const rC of rChanges) {
            const checked = lChanges.find(c => JSON.stringify(c.path) == JSON.stringify(rC.path));
            if (!checked) lChanges.push(rC);
        }
    }
    return lChanges;
}