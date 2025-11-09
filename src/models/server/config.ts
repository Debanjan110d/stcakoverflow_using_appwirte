import env from "@/app/env";
import {Avatars, Client, Databases, Storage,Users} from "node-appwrite";

// eslint-disable-next-line prefer-const
let client = new Client();

client
    .setEndpoint(env.appwriteEndpoint) // Your API Endpoint
    .setProject(env.appwriteProjectId) // Your project ID
    .setKey(env.apiKey) // Your secret API key
;

export const users = new Users(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;