export enum ChangeTypes {
    NOT_FOUND = "Not found",
    NOT_TYPE = "Not type",
    NOT_EQUAL = "Not equal"
}

export interface Change {
    path: any[];
    type: ChangeTypes;
    value: any;
}

export function changes(from: any, look: any = {}, options?: { path?: string[], bi?: boolean }) {
    const lChanges: Change[] = [];
    const path = options?.path || [];

    for (const i in from) {
        if (!look.hasOwnProperty(i)) {
            lChanges.push({ path: [...path, i], type: ChangeTypes.NOT_FOUND, value: from[i] });
        }
        else if (typeof from[i] !== typeof look[i]) {
            lChanges.push({ path: [...path, i], type: ChangeTypes.NOT_TYPE, value: look[i] });
        }
        else if (typeof from[i] == "object") {
            lChanges.push(...changes(from[i], look[i], { path: [...path, i] }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: [...path, i], type: ChangeTypes.NOT_EQUAL, value: look[i] });
        }
    }

    if (options?.bi) {
        const rChanges = changes(look, from, { bi: false });

        for (const rC of rChanges) {
            const checked = lChanges.find(c => JSON.stringify(c.path) == JSON.stringify(rC.path));            
            if(!checked) lChanges.push(rC);
        }
    }

    return lChanges;
}