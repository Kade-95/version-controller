import { LoneDB, LoneDocument } from "lonedb";
import { IRepo } from "./repo.class";

const storage = new LoneDB<IRepo>("Repos");

export const readFunction = async (data: Partial<LoneDocument<IRepo>>) => {
    return await storage.findOne(data);
}

export const insertFunction = async (data: IRepo) => {
    return await storage.insertOne(data);
}

export const updateFunction = async (params: Partial<LoneDocument<IRepo>>, data: Partial<IRepo>) => {
    return await storage.updateOne(params, data);
}

export const deleteFunction = async (params: Partial<LoneDocument<IRepo>>) => {
    return await storage.deleteOne(params);
}

export interface RepoDatabase<T = any> {
    insert: (data: IRepo<T>) => Promise<LoneDocument<IRepo<T>>>;
    read: (data: Partial<LoneDocument<IRepo>>) => Promise<IRepo<T>>;
    update: (params: Partial<LoneDocument<IRepo>>, data: Partial<IRepo>) => Promise<any>;
    delete: (data: Partial<LoneDocument<IRepo>>) => Promise<IRepo<T>>;
}