import * as z from "zod";

export const commentSchema = z.object({
  author: z.coerce
    .string()
    .trim()
    .min(1, "Author must have at least 3 characters.")
    .max(30, "Author must be at most 30 characters."),
  message: z.coerce
    .string()
    .trim()
    .min(3, "Message must have at least 3 characters.")
    .max(300, "Message must be at most 300 characters."),
});

export const commentSchemaWithId = commentSchema.extend({
  id: z.coerce
    .number()
    .int("ID must be an integer.")
    .min(1, "ID must be greater than 0."),
});
