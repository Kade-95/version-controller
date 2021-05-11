export enum ChangeTypes {
    REMOVED = "Removed",
    MUTATED = "Mutated",
    ADDED = "Added"
}

export interface Change {
    path: any[];
    type: ChangeTypes;
    before: any;
    after: any;
}

export function getChanges(from: any, look: any, options?: { path?: string[], bi?: boolean, halphed?: boolean }) {
    const lChanges: Change[] = [];
    const path = options?.path || [];

    from = from || {};
    look = look || {};

    for (const i in from) {
        const after = (options?.halphed) ? from[i] : look[i];
        const before = (options?.halphed) ? look[i] : from[i];

        if (!look?.hasOwnProperty(i)) {
            lChanges.push({ path: [...path, i], type: (options?.halphed) ? ChangeTypes.ADDED : ChangeTypes.REMOVED, before, after });
        }
        else if (typeof from[i] == "object") {
            lChanges.push(...getChanges(from[i], look[i], { path: [...path, i] }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: [...path, i], type: ChangeTypes.MUTATED, before, after });
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