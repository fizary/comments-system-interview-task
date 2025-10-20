import { Router } from "express";
import { commentsRouter } from "./api/comments/index.js";

const router = Router();

router.use("/comments", commentsRouter);

export { router };
