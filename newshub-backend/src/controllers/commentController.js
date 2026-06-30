import {
  createCommentService,
  getCommentsByArticleService,
} from "../services/commentService.js";

export const addComment = async (req, res) => {
  try {
    const { article_id, name, comment } = req.body;

    const newComment = await createCommentService(article_id, name, comment);

    const io = req.app.get("io");

    io.to(`article_${article_id}`).emit("receive_comment", newComment);

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await getCommentsByArticleService(articleId);

    res.json(comments);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
