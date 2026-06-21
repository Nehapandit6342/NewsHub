import pool from "../../config/db.js";

export const getAllComments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id,
          c.article_id,  
        c.name,
        c.comment,
        c.status,
        c.created_at,
        a.title AS article_title,
         a.image AS article_image
      FROM comments c
      JOIN articles a ON a.id = c.article_id
      ORDER BY c.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE comments SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM comments WHERE id = $1", [id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
