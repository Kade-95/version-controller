export function retrieve(collection: any, path: string[]) {
    //retrieve data from an object
    const data = (block: any, at: any) => {
        return block[at];
    }

    let value;

    for (let i in path) {
        if (i == "0") {
            //set the value on first dir
            value = data(collection, path[i])
        }
        else {
            value = data(value, path[i])
        }
    }

    return value;
}