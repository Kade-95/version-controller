import { LocalDB } from "./local.storage";
import { LocalDocument } from "./models/query.model";
import { IRepo } from "./repo.class";

const storage = new LocalDB<IRepo>("Repos");

export const readFunction = async (data: Partial<LocalDocument<IRepo>>) => {
    return await storage.findOne(data);
}

export const insertFunction = async (data: IRepo) => {
    return await storage.insertOne(data);
}

export const updateFunction = async (params: Partial<LocalDocument<IRepo>>, data: Partial<IRepo>) => {
    return await storage.updateOne(params, data);
}

export const deleteFunction = async (params: Partial<LocalDocument<IRepo>>) => {    
    return await storage.deleteOne(params);
}

export interface RepoDatabase<T = any> {
    insert: (data: IRepo<T>) => Promise<LocalDocument<IRepo<T>>>;
    read: (data: Partial<LocalDocument<IRepo>>) => Promise<IRepo<T>>;
    update: (params: Partial<LocalDocument<IRepo>>, data: Partial<IRepo>) => Promise<any>;
    delete: (data: Partial<LocalDocument<IRepo>>) => Promise<IRepo<T>>;
}