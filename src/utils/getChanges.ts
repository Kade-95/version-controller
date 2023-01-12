import { ChangeEnum } from "../models/change.enum";
import { IChange } from "../models/change.interface";

export function getChanges(from: any, look: any, options?: { path?: string[], bi?: boolean, halphed?: boolean }) {
    const lChanges: IChange[] = [];
    const path = options?.path || [];

    from = from || {};
    look = look || {};

    for (const i in from) {
        const after = (options?.halphed) ? from[i] : look[i];
        const before = (options?.halphed) ? look[i] : from[i];

        if (!look?.hasOwnProperty(i)) {
            lChanges.push({ path: [...path, i], type: (options?.halphed) ? ChangeEnum.ADDED : ChangeEnum.REMOVED, before, after });
        }
        else if (typeof from[i] == "object") {
            lChanges.push(...getChanges(from[i], look[i], { path: [...path, i] }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: [...path, i], type: ChangeEnum.MUTATED, before, after });
        }
    }

    if (options?.bi) {
        const rChanges = getChanges(look, from, { halphed: true });

        for (const rC of rChanges) {
            const checked = lChanges.find(c => JSON.stringify(c.path) == JSON.stringify(rC.path));
            if (!checked) lChanges.push(rC);
        }
    }
    return lChanges;
}