// It is a good practice to use same validator library on both frontend and backend for consistency
// That's why i switched to zod, because it is general purpose validator not tied to express and can run both in nodejs and browser
import z from "zod";

// Messages
const limitErrorMessage = "Limit must be an integer between 1 and 20.";
const offsetErrorMessage = "Offset must be an integer greater or equal 0.";
const idErrorMessage = "Id must be an integer greater than 0.";
const authorErrorMessage = "Author must be 3 to 30 characters long.";
const messageErrorMessage = "Message must be 3 to 300 characters long.";

// Fields
const id = z.coerce.number(idErrorMessage).int(idErrorMessage).min(1, idErrorMessage);
const author = z.string(authorErrorMessage).trim().min(3, authorErrorMessage).max(30, authorErrorMessage);
const message = z.string(messageErrorMessage).trim().min(3, messageErrorMessage).max(300, messageErrorMessage);
const limit = z.coerce.number(limitErrorMessage).int(limitErrorMessage).min(1, limitErrorMessage).max(20, limitErrorMessage);
const offset = z.coerce.number(offsetErrorMessage).int(offsetErrorMessage).min(0, offsetErrorMessage);

// Schemas
export const getAllCommentsSchema = z.object({ limit: limit.optional(), offset: offset.optional() });
export const getOneCommentSchema = z.object({ id });
export const createCommentSchema = z.object({ author, message });
export const updateCommentSchema = z.object({ id, author, message });
export const deleteCommentSchema = z.object({ id });
