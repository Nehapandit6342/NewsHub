import {
  getFeaturedArticles,
  getSecondaryArticles,
  getLatestArticles,
  getTrendingArticles,
  getAllArticles,
  getPublishedArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  getArticlesByCategory,
  getBreakingNewsService,
} from "../services/articleService.js";

// GET /api/articles/latest
export const latestArticles = async (req, res) => {
  try {
    const data = await getLatestArticles();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FEATURED
export const featuredArticles = async (req, res) => {
  const data = await getFeaturedArticles();
  res.json({ success: true, data });
};

// SECONDARY
export const secondaryArticles = async (req, res) => {
  const data = await getSecondaryArticles();
  res.json({ success: true, data });
};

// trending

export const trendingArticles = async (req, res) => {
  try {
    const data = await getTrendingArticles();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// PUBlic articles(website)
// GET /api/articles
export const allArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    const offset = (page - 1) * limit;

    const data = await getPublishedArticles(limit, offset, category);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /api/articles/:id
export const singleArticle = async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/articles/:id

export const updateArticleController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      category,
      short_description,
      content,
      status,
      section,
      is_breaking,
    } = req.body;

    // SAFE IMAGE HANDLING
    const image = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : undefined;

    const updated = await updateArticle(id, {
      title,
      category,
      short_description,
      content,
      image,
      status,
      section,
      is_breaking: is_breaking === "true",
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update article",
      error: error.message,
    });
  }
};

// DELETE /api/articles/:id
export const deleteArticleController = async (req, res) => {
  try {
    const deleted = await deleteArticle(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// upload image
export const addArticle = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const image = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : null;

    const article = await createArticle({
      title: req.body.title,
      category: req.body.category,
      short_description: req.body.short_description,
      content: req.body.content,
      status: req.body.status,
      section: req.body.section,
      is_breaking: req.body.is_breaking === "true",
      image,
    });
    const result = await createArticle(articleData);

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SearchArticleController//
export const searchArticleController = async (req, res) => {
  try {
    const q = req.query.q || "";

    const data = await searchArticles(q);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Admin Articles
export const adminArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const data = await getAllArticles(limit, offset);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const categoryArticles = async (req, res) => {
  try {
    const { name } = req.params;

    const data = await getArticlesByCategory(name);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Breaking News

export const getBreakingNews = async (req, res) => {
  try {
    const news = await getBreakingNewsService();

    res.json(news);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
