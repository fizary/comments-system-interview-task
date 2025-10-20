import { validationResult, matchedData } from "express-validator";
import { models } from "../../models/index.js";
import { ValidationError, NotFoundError } from "../../utils/errors.js";

// Ideally we would have some user system implemented and validate if user is authenticated and have permissions to execute a task
// Mysql driver does not support `options.returning`, so we are forced to do 2 sql queries in some cases to consistently return affected data in response

export const getAllHandler = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    return next(new ValidationError(result.array().map(error => error.msg)));

  const data = matchedData(req);
  const comments = await models.Comment.findAll({ limit: data.limit ?? 10, offset: data.offset ?? 0, order: [["id", "DESC"]] });

  return res
    .status(200)
    .json({ success: true, data: comments });
}

export const getOneHandler = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    return next(new ValidationError(result.array().map(error => error.msg)));

  const data = matchedData(req);
  const comment = await models.Comment.findByPk(data.id);

  if (!comment)
    return next(new NotFoundError());

  return res
    .status(200)
    .json({ success: true, data: comment });
}

export const createHandler = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    return next(new ValidationError(result.array().map(error => error.msg)));

  const data = matchedData(req);
  const comment = await models.Comment.create({ author: data.author, message: data.message });

  return res
    .status(200)
    .json({ success: true, data: comment });
}

export const updateHandler = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    return next(new ValidationError(result.array().map(error => error.msg)));

  const data = matchedData(req);
  const comment = await models.Comment.findByPk(data.id);

  if (!comment)
    return next(new NotFoundError());

  await comment.update({
    author: data.author,
    message: data.message,
  });

  return res
    .status(200)
    .json({ success: true, data: comment });
}

export const deleteHandler = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    return next(new ValidationError(result.array().map(error => error.msg)));

  const data = matchedData(req);
  const comment = await models.Comment.findByPk(data.id);

  if (!comment)
    return next(new NotFoundError());

  await comment.destroy();

  return res
    .status(200)
    .json({ success: true, data: comment });
}
