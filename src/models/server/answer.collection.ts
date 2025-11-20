import { Client, TablesDB, Permission, Role, IndexType } from "node-appwrite";
import { db, answerCollection } from "@/models/name";

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

export async function createAnswerTable() {
  // Starting creation of table: answerCollection

  await safeCall(
        () =>
            tables.createTable({
                databaseId: DATABASE_ID,
                tableId: answerCollection,
                name: answerCollection,
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

    // Create columns sequentially and use a smaller size for content to avoid plan limits
    await safeCall(
        () =>
            tables.createStringColumn({
                databaseId: DATABASE_ID,
                tableId: answerCollection,
                key: "content",
                size: 5000,
                required: true,
            }),
        "createStringColumn:content"
    );

    await safeCall(
        () =>
            tables.createStringColumn({
                databaseId: DATABASE_ID,
                tableId: answerCollection,
                key: "authorId",
                size: 64,
                required: true,
            }),
        "createStringColumn:authorId"
    );

    await safeCall(
        () =>
            tables.createStringColumn({
                databaseId: DATABASE_ID,
                tableId: answerCollection,
                key: "questionId",
                size: 64,
                required: true,
            }),
        "createStringColumn:questionId"
    );

    console.log("Waiting for columns to be available...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    await Promise.all([
        safeCall(
            () =>
                tables.createIndex({
                    databaseId: DATABASE_ID,
                    tableId: answerCollection,
                    key: "idx_questionid_key",
                    type: IndexType.Key,
                    columns: ["questionId"],
                }),
            "createIndex:idx_questionid_key"
        ),
        safeCall(
            () =>
                tables.createIndex({
                    databaseId: DATABASE_ID,
                    tableId: answerCollection,
                    key: "idx_authorid_key",
                    type: IndexType.Key,
                    columns: ["authorId"],
                }),
            "createIndex:idx_authorid_key"
        ),
    ]);

    // Answer table setup complete
}
