import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { permit } from "../middleware/role.middleware.js";
import {
  createEditorController,
  getEditorsController,
  deleteEditorController,
} from "../controllers/editor.controller.js";

const router = express.Router();

router.get("/", authMiddleware, permit("admin"), getEditorsController);
router.post(
  "/create-editor",
  authMiddleware,
  permit("admin"),
  createEditorController,
);
router.delete("/:id", authMiddleware, permit("admin"), deleteEditorController);
export default router;
