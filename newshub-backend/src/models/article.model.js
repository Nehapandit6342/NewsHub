import pool from "../config/db.js";

export const getAllArticles = async () => {
  const result = await pool.query(`
    SELECT *
    FROM articles
    ORDER BY id DESC
  `);

  return result.rows;
};

export const createArticle = async (article) => {
  const {
    title,
    category,
    short_description,
    content,
    image,
    status,
    section,
  } = article;

  const result = await pool.query(
    `
    INSERT INTO articles
    (title, category, short_description, content, image, status, section)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [title, category, short_description, content, image, status, section],
  );

  return result.rows[0];
};
