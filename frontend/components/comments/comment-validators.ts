// It would be a good idea to create a proper monorepo out of this project and move reusable code to shared directory and dependencies to root package.json
import z from "zod";

// Messages
const authorErrorMessage = "Author must be 3 to 30 characters long.";
const messageErrorMessage = "Message must be 3 to 300 characters long.";

// Fields
const author = z
  .string(authorErrorMessage)
  .trim()
  .min(3, authorErrorMessage)
  .max(30, authorErrorMessage);
const message = z
  .string(messageErrorMessage)
  .trim()
  .min(3, messageErrorMessage)
  .max(300, messageErrorMessage);

// Schemas
export const commentSchema = z.object({ author, message });
