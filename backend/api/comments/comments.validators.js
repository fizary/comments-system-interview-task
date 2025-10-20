import { param, body, query } from "express-validator";
import { validateOneOfExists } from "../../utils/validators.js";

// Field validators
const validateId = () => {
  return param("id")
    .customSanitizer(value => Number(value))
    .isInt({ min: 1 }).withMessage("Parameter `id` must be an integer greater than 0.");
}

const validateAuthor = (required = true) => {
  const validator = body("author");

  if (required)
    validator.exists().withMessage("Field `author` is required.");
  else
    validator.optional();
    
  return validator
    .isString().withMessage("Field `author` must be a string.")
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage("Field `author` must be from 3 to 30 characters long.")
    .escape();
}

const validateMessage = (required = true) => {
  const validator = body("message");

  if (required)
    validator.exists().withMessage("Field `message` is required.");
  else
    validator.optional();

  return validator
    .isString().withMessage("Field `message` must be a string.")
    .trim()
    .isLength({ min: 3, max: 300 }).withMessage("Field `message` must be from 3 to 300 characters long.")
    .escape();
}

const validateLimit = () => {
  return query("limit")
    .optional()
    .customSanitizer(value => Number(value))
    .isInt({ min: 1, max: 20 }).withMessage("Query parameter `limit` must be an integer between 1 and 20.");
}

const validateOffset = () => {
  return query("offset")
    .optional()
    .customSanitizer(value => Number(value))
    .isInt({ min: 0 }).withMessage("Query parameter `offset` must be an integer greater or equal 0.");
}

// Route validators
export const validateGetAllRoute = [validateLimit(), validateOffset()];
export const validateGetOneRoute = [validateId()];
export const validateCreateRoute = [validateAuthor(), validateMessage()];
export const validateUpdateRoute = [validateId(), validateOneOfExists([body("author"), body("message")]), validateAuthor(false), validateMessage(false)];
export const validateDeleteRoute = [validateId()];
