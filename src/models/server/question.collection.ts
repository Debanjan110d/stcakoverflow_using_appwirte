/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, TablesDB, Permission, Role, IndexType } from "node-appwrite";
import { db, questionCollection } from "@/models/name";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_HOST_URI!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const SERVER_KEY = process.env.APPWRITE_API_KEY!;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || db;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(SERVER_KEY);

// 🆕 use Tables instead of Databases
const tables = new TablesDB(client);

function isAlreadyExistsError(err: unknown): boolean {
  return (
    (typeof err === "object" && err !== null && "code" in err && (err as any).code === 409) ||
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

export async function createQuestionTable() {
  // Starting creation of table: questionCollection

  await safeCall(
    () =>
      tables.createTable({
        databaseId: DATABASE_ID,
        tableId: questionCollection,
        name: questionCollection,
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
          tableId: questionCollection,
          key: "title",
          size: 200,
          required: true,
        }),
      "createStringColumn:title"
    ),
    safeCall(
      () =>
        tables.createStringColumn({
          databaseId: DATABASE_ID,
          tableId: questionCollection,
          key: "content",
          size: 5000,
          required: true,
        }),
      "createStringColumn:content"
    ),
    safeCall(
      () =>
        tables.createStringColumn({
          databaseId: DATABASE_ID,
          tableId: questionCollection,
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
          tableId: questionCollection,
          key: "tags",
          size: 100,
          required: false,
          array: true,
        }),
      "createStringColumn:tags"
    ),
    safeCall(
      () =>
        tables.createStringColumn({
          databaseId: DATABASE_ID,
          tableId: questionCollection,
          key: "attachmentId",
          size: 64,
          required: false,
        }),
      "createStringColumn:attachmentId"
    ),
  ]);

  // Waiting for columns to be available...
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await Promise.all([
    safeCall(
      () =>
        tables.createIndex({
          databaseId: DATABASE_ID,
          tableId: questionCollection,
          key: "idx_title_fulltext",
          type: IndexType.Fulltext,
          columns: ["title"],
        }),
      "createIndex:idx_title_fulltext"
    ),
    safeCall(
      () =>
        tables.createIndex({
          databaseId: DATABASE_ID,
          tableId: questionCollection,
          key: "idx_authorid_key",
          type: IndexType.Key,
          columns: ["authorId"],
        }),
      "createIndex:idx_authorid_key"
    ),
    safeCall(
      () =>
        tables.createIndex({
          databaseId: DATABASE_ID,
          tableId: questionCollection,
          key: "idx_tags_key",
          type: IndexType.Key,
          columns: ["tags"],
        }),
      "createIndex:idx_tags_key"
    ),
  ]);

  // Question table setup complete
}

