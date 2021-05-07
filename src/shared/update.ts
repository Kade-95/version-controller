import { Change, ChangeTypes } from "./changes";

export function update(current: any, changes: Change[]) {
    const data = (block: any, at: any) => {
        return block[at];
    }

    for (let c of changes) {
        let attr = current;

        for (let i = 0; i < c.path.length; i++) {
            if (i == c.path.length - 1) {
                if (c.type == ChangeTypes.NOT_FOUND && c.value == undefined) {
                    delete attr[c.path[i]]
                }
                else {
                    attr[c.path[i]] = c.value;
                }
            }
            else {
                attr = data(attr, c.path[i]);
            }
        }
    }

    return current;
}