import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

import { permit } from "../middleware/role.middleware.js";
import upload from "../config/multer.js";
import pool from "../config/db.js";

import {
  adminArticles,
  updateArticleController,
  deleteArticleController,
  addArticle,
  bulkDeleteArticles,
  bulkArchiveArticles,
  approveArticleController,
} from "../controllers/articleController.js";

const router = express.Router();

/* ================= STATS ================= */
router.get("/stats", authMiddleware, permit("admin"), async (req, res) => {
  try {
    const articles = await pool.query("SELECT COUNT(*) FROM articles");
    const comments = await pool.query("SELECT COUNT(*) FROM comments");
    const views = await pool.query(
      "SELECT COALESCE(SUM(views),0) AS total_views FROM articles",
    );

    res.json({
      totalArticles: parseInt(articles.rows[0].count),
      totalComments: parseInt(comments.rows[0].count),
      totalViews: parseInt(views.rows[0].total_views),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= RECENT ================= */
router.get(
  "/recent-articles",
  authMiddleware,
  permit("admin"),
  async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT *
      FROM articles
      ORDER BY created_at DESC
      LIMIT 5
    `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.get(
  "/recent-comments",
  authMiddleware,
  permit("admin"),
  async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT *
      FROM comments
      ORDER BY id DESC
      LIMIT 5
    `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

/* ================= ARTICLES (ADMIN) ================= */

// GET ALL (ADMIN)
router.get(
  "/articles",
  authMiddleware,
  permit("admin", "editor"),
  adminArticles,
);

// CREATE
router.post(
  "/articles",
  authMiddleware,
  permit("admin", "editor"),
  upload.single("image"),
  addArticle,
);

// UPDATE
router.put(
  "/articles/:id",
  authMiddleware,
  permit("admin", "editor"),
  upload.single("image"),
  updateArticleController,
);
router.delete("/articles/bulk", bulkDeleteArticles);

// routes/adminArticles.routes.js
router.patch("/articles/bulk-archive", bulkArchiveArticles);
// DELETE
router.delete(
  "/articles/:id",
  authMiddleware,
  permit("admin"),
  deleteArticleController,
);

//approve
router.patch(
  "/articles/:id/approve",
  authMiddleware,
  permit("admin"),
  approveArticleController,
);

export default router;
