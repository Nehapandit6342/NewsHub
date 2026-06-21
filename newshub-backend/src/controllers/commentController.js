import pool from "../config/db.js";

export const addComment = async (req, res) => {
  try {
    const { article_id, name, comment } = req.body;

    const result = await pool.query(
      `INSERT INTO comments (article_id, name, comment, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [article_id, name, comment, "visible"],
    );

    // realtime emit
    const io = req.app.get("io");
    io.to(`article_${article_id}`).emit("receive_comment", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getComments = async (req, res) => {
  try {
    const { articleId } = req.params;

    const result = await pool.query(
      `SELECT * FROM comments 
       WHERE article_id = $1 
       ORDER BY created_at DESC`,
      [articleId],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
