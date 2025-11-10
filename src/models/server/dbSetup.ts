import { db } from "../name";
import { createAnswerTable } from "./answer.collection";
import { createQuestionTable } from "./question.collection";
import { createVotesTable } from "./votes.collection";
import { createCommentTable } from "./comment.collection";
import { createQuestionAttachmentBucket } from "./storage.collection";
import { databases } from "./config";

export default async function createDB() {
  try {
    await databases.get({ databaseId: db });
    console.log("✅ Database already exists:", db);

    await createQuestionTable();
    await createAnswerTable();
    await createVotesTable();
    await createCommentTable();
    await createQuestionAttachmentBucket();

  } catch (error: unknown) {
    const status = error && typeof error === "object" && ("code" in error ? (error as { code: number }).code : 
                   "response" in error && error.response && typeof error.response === "object" && "status" in error.response ? 
                   (error.response as { status: number }).status : 
                   "status" in error ? (error as { status: number }).status : undefined);
    const message = error instanceof Error ? error.message : String(error);

    if (status === 404 || /not found/i.test(message)) {
      try {
        const created = await databases.create({
          databaseId: db,
          name: "StackOverflow Database",
          enabled: true,
        });

        console.log("✅ Database created:", created?.$id ?? created);

        await createQuestionTable();
        await createAnswerTable();
        await createVotesTable();
        await createCommentTable();
        await createQuestionAttachmentBucket();

      } catch (createError: unknown) {
        const createMessage = createError instanceof Error ? createError.message : String(createError);
        console.error("❌ Error creating database:", createMessage);
        throw createError;
      }
    } else {
      console.error("❌ Error checking database:", error);
      throw error;
    }
  }
}

if (require.main === module) {
  createDB().catch((err) => {
    console.error("Fatal error during setup:", err);
    process.exit(1);
  });
}
