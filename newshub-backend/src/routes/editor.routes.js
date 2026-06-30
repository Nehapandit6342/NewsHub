import express from "express";
import { sendEditorWelcomeEmail } from "../utils/editorEmail.js";
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
router.get("/test-email", async (req, res) => {
  try {
    await sendEditorWelcomeEmail("yourtestemail@gmail.com", "123456");

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
});
export default router;
