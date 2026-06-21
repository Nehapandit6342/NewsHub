import express from "express";
import {
  getAllComments,
  updateCommentStatus,
  deleteComment,
} from "../controllers/admin/adminCommentController.js";

const router = express.Router();

// GET ALL COMMENTS
router.get("/", getAllComments);

// UPDATE STATUS (HIDE / SHOW)
router.put("/:id", updateCommentStatus);

// DELETE COMMENT
router.delete("/:id", deleteComment);

export default router;
