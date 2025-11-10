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

export async function createCommentTable() {
    console.log("Starting creation of table:", commentCollection);

    await tables.createTable({
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
    });

    await Promise.all([
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: commentCollection,
            key: "content",
            size: 2000,
            required: true,
        }),
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: commentCollection,
            key: "authorId",
            size: 64,
            required: true,
        }),
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: commentCollection,
            key: "typeId",
            size: 64,
            required: true,
        }),
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: commentCollection,
            key: "type",
            size: 20,
            required: true,
        }),
    ]);

    await Promise.all([
        tables.createIndex({
            databaseId: DATABASE_ID,
            tableId: commentCollection,
            key: "idx_typeid_key",
            type: IndexType.Key,
            columns: ["typeId"],
        }),
        tables.createIndex({
            databaseId: DATABASE_ID,
            tableId: commentCollection,
            key: "idx_authorid_key",
            type: IndexType.Key,
            columns: ["authorId"],
        }),
    ]);

    console.log("✅ Comment table setup complete.");
}
