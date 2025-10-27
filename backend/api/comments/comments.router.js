import { Router } from "express";
import { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler } from "./comments.handlers.js";
import { delay } from "../../middlewares/delay.js";

const router = Router();

router.get("/", delay(300), getAllHandler);
router.get("/:id", delay(300), getOneHandler);
router.post("/", delay(600), createHandler);
router.put("/:id", delay(600), updateHandler);
router.delete("/:id", delay(600), deleteHandler);

export { router };
