import { Collection, IDocument } from "@black-ink/lonedb";
import { Repo } from "../models/repo";

const storage = new Collection<Repo>("Repos");

export const readFunction = async (data: Partial<IDocument<Repo>>) => {
    return await storage.findOne(data);
}

export const insertFunction = async (data: Repo) => {
    return await storage.insertOne(data);
}

export const updateFunction = async (params: Partial<IDocument<Repo>>, data: Partial<Repo>) => {
    return await storage.updateOne(params, data);
}

export const deleteFunction = async (params: Partial<IDocument<Repo>>) => {
    return await storage.removeOne(params);
}

export interface RepoDatabase<T = any> {
    insert: (data: Repo<T>) => Promise<IDocument<Repo<T>>>;
    read: (data: Partial<IDocument<Repo>>) => Promise<Repo<T>>;
    update: (params: Partial<IDocument<Repo>>, data: Partial<Repo>) => Promise<any>;
    delete: (data: Partial<IDocument<Repo>>) => Promise<Repo<T>>;
}