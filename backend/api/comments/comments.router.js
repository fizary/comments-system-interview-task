import { Router } from "express";
import { validateGetAllRoute, validateGetOneRoute, validateCreateRoute, validateUpdateRoute, validateDeleteRoute } from "./comments.validators.js";
import { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler } from "./comments.handlers.js";
import { delay } from "../../middlewares/delay.js";

const router = Router();

router.get("/", delay(300), validateGetAllRoute, getAllHandler);
router.get("/:id", delay(300), validateGetOneRoute, getOneHandler);
router.post("/", delay(600), validateCreateRoute, createHandler);
router.put("/:id", delay(600), validateUpdateRoute, updateHandler);
router.delete("/:id", delay(600), validateDeleteRoute, deleteHandler);

export { router };
