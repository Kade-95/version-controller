export function retrieve(collection: any, path: string[]) {
    //retrieve data from an object
    const fetch = (block: any, at: any) => {
        return block[at];
    }

    let value;

    for (let i in path) {
        if (i == "0") {
            //set the value on first dir
            value = fetch(collection, path[i])
        }
        else {
            value = fetch(value, path[i])
        }
    }

    return value;
}