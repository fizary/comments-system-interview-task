import { Router } from "express";
import { validateGetAllRoute, validateGetOneRoute, validateCreateRoute, validateUpdateRoute, validateDeleteRoute } from "./comments.validators.js";
import { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler } from "./comments.handlers.js";

const router = Router();

router.get("/", validateGetAllRoute, getAllHandler);
router.get("/:id", validateGetOneRoute, getOneHandler);
router.post("/", validateCreateRoute, createHandler);
router.put("/:id", validateUpdateRoute, updateHandler);
router.delete("/:id", validateDeleteRoute, deleteHandler);

export { router };
