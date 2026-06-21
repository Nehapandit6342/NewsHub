import express from "express";
import {
  latestArticles,
  allArticles,
  searchArticleController,
  singleArticle,
  addArticle,
  updateArticleController,
  deleteArticleController,
  trendingArticles,
  featuredArticles, // ✅ ADD THIS
  secondaryArticles,
  categoryArticles,
} from "../controllers/articleController.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { upload } from "../middleware/upload.middleware.js";
import { permit } from "../middleware/role.middleware.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", allArticles);
router.get("/search", searchArticleController);
router.get("/featured", featuredArticles);
router.get("/secondary", secondaryArticles);
router.get("/latest", latestArticles);
router.get("/category/:name", categoryArticles);
router.get("/trending", trendingArticles);

router.get("/:id", singleArticle);

// PROTECTED ADMIN ROUTES

router.put(
  "/:id",
  authMiddleware,
  permit("admin", "editor"),
  upload.single("image"),
  updateArticleController,
);

router.delete("/:id", authMiddleware, permit("admin"), deleteArticleController);
// upload
router.post(
  "/",
  authMiddleware,
  permit("admin", "editor"),
  upload.single("image"),
  addArticle,
);
router.put("/:id/view", async (req, res) => {
  try {
    await pool.query(
      "UPDATE articles SET views = COALESCE(views,0) + 1 WHERE id = $1",
      [req.params.id],
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
