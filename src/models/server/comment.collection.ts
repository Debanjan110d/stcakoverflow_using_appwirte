import { Client, TablesDB, Permission, Role, IndexType } from "node-appwrite";
import { db, commentCollection } from "@/models/name";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_HOST_URI!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const SERVER_KEY = process.env.APPWRITE_API_KEY!;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || db;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(SERVER_KEY);

const tables = new TablesDB(client);

function isAlreadyExistsError(err: unknown): boolean {
    return (
        (typeof err === "object" && err !== null && "code" in err && (err as { code: number }).code === 409) ||
        String(err).toLowerCase().includes("already")
    );
}

async function safeCall(fn: () => Promise<unknown>, description = ""): Promise<unknown> {
    try {
        return await fn();
    } catch (err: unknown) {
        if (isAlreadyExistsError(err)) {
            console.warn(`${description} already exists — skipping.`);
            return null;
        }
        console.error(`Error during ${description}:`, err);
        throw err;
    }
}

export async function createCommentTable() {
    console.log("Starting creation of table:", commentCollection);

    await safeCall(
        () =>
            tables.createTable({
                databaseId: DATABASE_ID,
                tableId: commentCollection,
                name: commentCollection,
                permissions: [
                    Permission.read(Role.any()),
                    Permission.create(Role.users()),
                    Permission.update(Role.users()),
                    Permission.delete(Role.users()),
                ],
                enabled: true,
            }),
        "createTable"
    );

    await Promise.all([
        safeCall(
            () =>
                tables.createStringColumn({
                    databaseId: DATABASE_ID,
                    tableId: commentCollection,
                    key: "content",
                    size: 2000,
                    required: true,
                }),
            "createStringColumn:content"
        ),
        safeCall(
            () =>
                tables.createStringColumn({
                    databaseId: DATABASE_ID,
                    tableId: commentCollection,
                    key: "authorId",
                    size: 64,
                    required: true,
                }),
            "createStringColumn:authorId"
        ),
        safeCall(
            () =>
                tables.createStringColumn({
                    databaseId: DATABASE_ID,
                    tableId: commentCollection,
                    key: "typeId",
                    size: 64,
                    required: true,
                }),
            "createStringColumn:typeId"
        ),
        safeCall(
            () =>
                tables.createStringColumn({
                    databaseId: DATABASE_ID,
                    tableId: commentCollection,
                    key: "type",
                    size: 20,
                    required: true,
                }),
            "createStringColumn:type"
        ),
    ]);

    console.log("Waiting for columns to be available...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    await Promise.all([
        safeCall(
            () =>
                tables.createIndex({
                    databaseId: DATABASE_ID,
                    tableId: commentCollection,
                    key: "idx_typeid_key",
                    type: IndexType.Key,
                    columns: ["typeId"],
                }),
            "createIndex:idx_typeid_key"
        ),
        safeCall(
            () =>
                tables.createIndex({
                    databaseId: DATABASE_ID,
                    tableId: commentCollection,
                    key: "idx_authorid_key",
                    type: IndexType.Key,
                    columns: ["authorId"],
                }),
            "createIndex:idx_authorid_key"
        ),
    ]);

    console.log("✅ Comment table setup complete.");
}
