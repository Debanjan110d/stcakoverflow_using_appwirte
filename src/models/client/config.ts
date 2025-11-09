
import { Client, Account,  Avatars, Databases, Storage } from "appwrite";
import env from "@/app/env";

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(env.appwriteEndpoint) // Your API Endpoint
    .setProject(env.appwriteProjectId); // Your project ID


// Exported it in on the go 
export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;

