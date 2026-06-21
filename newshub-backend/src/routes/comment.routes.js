import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);

router.get("/:articleId", getComments);

export default router;
