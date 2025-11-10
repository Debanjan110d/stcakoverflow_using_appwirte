import { Client, Permission, Role, Storage } from "node-appwrite";
import { questionAttachmentBucket } from "@/models/name";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_HOST_URI!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const SERVER_KEY = process.env.APPWRITE_API_KEY!;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(SERVER_KEY);

const storage = new Storage(client);

export async function createQuestionAttachmentBucket() {
    try {
        const bucket = await storage.createBucket({
            bucketId: questionAttachmentBucket,
            name: questionAttachmentBucket,
            permissions: [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
            fileSecurity: false,
            enabled: true,
            maximumFileSize: 50000000,
            allowedFileExtensions: ["jpg", "png", "jpeg", "gif", "webp", "pdf"],
        });
        
        console.log("✅ Storage bucket created:", bucket.$id);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating bucket:", message);
        throw error;
    }
}



