import { Client, TablesDB, Permission, Role, IndexType } from "node-appwrite";
import { db, votesCollection } from "@/models/name";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_HOST_URI!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const SERVER_KEY = process.env.APPWRITE_API_KEY!;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || db;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(SERVER_KEY);

const tables = new TablesDB(client);

export async function createVotesTable() {
    console.log("Starting creation of table:", votesCollection);

    await tables.createTable({
        databaseId: DATABASE_ID,
        tableId: votesCollection,
        name: votesCollection,
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
            tableId: votesCollection,
            key: "voteStatus",
            size: 10,
            required: true,
        }),
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: votesCollection,
            key: "votedById",
            size: 64,
            required: true,
        }),
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: votesCollection,
            key: "typeId",
            size: 64,
            required: true,
        }),
        tables.createStringColumn({
            databaseId: DATABASE_ID,
            tableId: votesCollection,
            key: "type",
            size: 20,
            required: true,
        }),
    ]);

    await Promise.all([
        tables.createIndex({
            databaseId: DATABASE_ID,
            tableId: votesCollection,
            key: "idx_typeid_key",
            type: IndexType.Key,
            columns: ["typeId"],
        }),
        tables.createIndex({
            databaseId: DATABASE_ID,
            tableId: votesCollection,
            key: "idx_votedbyid_key",
            type: IndexType.Key,
            columns: ["votedById"],
        }),
        tables.createIndex({
            databaseId: DATABASE_ID,
            tableId: votesCollection,
            key: "idx_type_key",
            type: IndexType.Key,
            columns: ["type"],
        }),
    ]);

    console.log("✅ Votes table setup complete.");
}
