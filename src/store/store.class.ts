import { Collection, Database, IDocument, Storage } from "@black-ink/lonedb";

global.localStorage = new Storage();
export class Store<T> {
    repo: Database;
    collection: Collection<T>;

    constructor(
        db: string,
        name: string
    ){
        this.repo = new Database(db);
        this.collection = this.repo.createCollection<T>(name);
    }

    async read (data: Partial<IDocument<T>>) {
        return this.collection.findOne(data);
    }
    
    async insert (data: T) {
        return this.collection.insertOne(data);
    }
    
    async update (params: Partial<IDocument<T>>, data: Partial<T>) {
        return this.collection.updateOne(params, data);
    }
    
    async delete (params: Partial<IDocument<T>>) {
        return this.collection.removeOne(params);
    }
}
