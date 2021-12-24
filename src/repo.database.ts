import { LoneDB, Document } from "@black-ink/lonedb";
import { Repo } from "./models/repo";

const storage = new LoneDB<Repo>("Repos");

export const readFunction = async (data: Partial<Document<Repo>>) => {
    return await storage.findOne(data);
}

export const insertFunction = async (data: Repo) => {
    return await storage.insertOne(data);
}

export const updateFunction = async (params: Partial<Document<Repo>>, data: Partial<Repo>) => {
    return await storage.updateOne(params, data);
}

export const deleteFunction = async (params: Partial<Document<Repo>>) => {
    return await storage.deleteOne(params);
}

export interface RepoDatabase<T = any> {
    insert: (data: Repo<T>) => Promise<Document<Repo<T>>>;
    read: (data: Partial<Document<Repo>>) => Promise<Repo<T>>;
    update: (params: Partial<Document<Repo>>, data: Partial<Repo>) => Promise<any>;
    delete: (data: Partial<Document<Repo>>) => Promise<Repo<T>>;
}