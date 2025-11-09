
import { Client, Account, Avatars, Databases, Storage } from "appwrite";
import { APPWRITE_HOST, APPWRITE_PROJECT_ID } from "@/app/env";

const client = new Client()
    .setEndpoint(APPWRITE_HOST)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;

