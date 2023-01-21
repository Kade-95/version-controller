export function retrieve(
    data: any, 
    path: string[]
) {
    /**
     * @summary
     * This is used to rollback changes in a data
     * 
     * @param data - This is the current data
     * @param changes - This is the list of changes to be rolled back in the data
     */

    const fetch = (block: any, at: any) => {
        return block[at];
    }

    let value;    

    for (let i in path) {        
        if (i == "0") {
            //set the value on first dir
            value = fetch(data, path[i]);            
        }
        else {
            value = fetch(value, path[i])
        }        
    }

    return value;
}