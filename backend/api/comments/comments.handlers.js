import z from "zod";
import { models } from "../../models/index.js";
import { ValidationError, NotFoundError } from "../../utils/errors.js";
import { getAllCommentsSchema, getOneCommentSchema, createCommentSchema, updateCommentSchema, deleteCommentSchema } from "./comments.validators.js";

// Ideally we would have some user system implemented and validate if user is authenticated and have permissions to execute a task
// Mysql driver does not support `options.returning`, so we are forced to do 2 sql queries in some cases to consistently return affected data in response

export const getAllHandler = async (req, res, next) => {
  const validationResult = getAllCommentsSchema.safeParse({ limit: req.query.limit, offset: req.query.offset });

  if (!validationResult.success)
    return next(new ValidationError(z.flattenError(validationResult.error).fieldErrors));

  const { limit = 10, offset = 0 } = validationResult.data;
  const { rows: comments, count } = await models.Comment.findAndCountAll({ limit, offset, order: [["id", "DESC"]] });

  return res
    .status(200)
    .json({ success: true, data: comments, metadata: { totalItems: count } });
}

export const getOneHandler = async (req, res, next) => {
  const validationResult = getOneCommentSchema.safeParse({ id: req.params.id });

  if (!validationResult.success)
    return next(new ValidationError(z.flattenError(validationResult.error).fieldErrors));

  const { id } = validationResult.data;
  const comment = await models.Comment.findByPk(id);

  if (!comment)
    return next(new NotFoundError());

  return res
    .status(200)
    .json({ success: true, data: comment });
}

export const createHandler = async (req, res, next) => {
  const validationResult = createCommentSchema.safeParse({ author: req.body.author, message: req.body.message });

  if (!validationResult.success)
    return next(new ValidationError(z.flattenError(validationResult.error).fieldErrors));

  const { author, message } = validationResult.data;
  const comment = await models.Comment.create({ author, message });

  return res
    .status(200)
    .json({ success: true, data: comment });
}

export const updateHandler = async (req, res, next) => {
  const validationResult = updateCommentSchema.safeParse({ id: req.params.id, author: req.body.author, message: req.body.message });

  if (!validationResult.success)
    return next(new ValidationError(z.flattenError(validationResult.error).fieldErrors));

  const { id, author, message } = validationResult.data;
  const comment = await models.Comment.findByPk(id);

  if (!comment)
    return next(new NotFoundError());

  await comment.update({ author, message });

  return res
    .status(200)
    .json({ success: true, data: comment });
}

export const deleteHandler = async (req, res, next) => {
  const validationResult = deleteCommentSchema.safeParse({ id: req.params.id });

  if (!validationResult.success)
    return next(new ValidationError(z.flattenError(validationResult.error).fieldErrors));

  const { id } = validationResult.data;
  const comment = await models.Comment.findByPk(id);

  if (!comment)
    return next(new NotFoundError());

  await comment.destroy();

  return res
    .status(200)
    .json({ success: true, data: comment });
}
