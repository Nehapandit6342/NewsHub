import pool from "../config/db.js";

export const getLatestArticles = async () => {
  const result = await pool.query(`
    SELECT * 
    FROM articles 
    WHERE section = 'latest'
    AND status = 'published'
    ORDER BY id DESC
    LIMIT 4
  `);

  return result.rows;
};
// FEATURED
export const getFeaturedArticles = async () => {
  const result = await pool.query(
    "SELECT * FROM articles WHERE section = 'featured'  AND status ='published' ORDER BY id DESC LIMIT 1",
  );
  return result.rows;
};

// SECONDARY
export const getSecondaryArticles = async () => {
  const result = await pool.query(
    "SELECT * FROM articles WHERE section = 'secondary'  AND status ='published' ORDER BY id DESC LIMIT 2",
  );
  return result.rows;
};

export const getArticleById = async (id) => {
  // 1. increase views

  // 2. fetch article
  const result = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);

  return result.rows[0];
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
    is_breaking,
  } = article;

  const result = await pool.query(
    `INSERT INTO articles
    (title, category, short_description, content, image, status, section,is_breaking)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
      title,
      category,
      short_description,
      content,
      image,
      status,
      section,
      is_breaking,
    ],
  );

  return result.rows[0];
};
export const updateArticle = async (id, article) => {
  const {
    title,
    category,
    short_description,
    content,
    status,
    section,
    image,
    is_breaking,
  } = article;

  const result = await pool.query(
    `UPDATE articles 
       SET title=$1, category=$2, short_description=$3, content=$4,
           status=$5, section=$6, image=COALESCE($7,image),   is_breaking=$8
       WHERE id=$9
       RETURNING *`,
    [
      title,
      category,
      short_description,
      content,
      status,
      section,
      image,
      is_breaking,
      id,
    ],
  );

  return result.rows[0];
};
export const deleteArticle = async (id) => {
  const result = await pool.query(
    "DELETE FROM articles WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};
// trending articles
export const getTrendingArticles = async () => {
  const result = await pool.query(`
    SELECT *
    FROM articles
    WHERE status = 'published'
    ORDER BY views DESC
    LIMIT 5
  `);

  return result.rows;
};
export const searchArticles = async (query) => {
  const result = await pool.query(
    `
    SELECT *
    FROM articles
    WHERE title ILIKE $1
    OR content ILIKE $1
    OR category ILIKE $1
    ORDER BY id DESC
  `,
    [`%${query}%`],
  );

  return result.rows;
};
// User side (public api)
export const getPublishedArticles = async (limit, offset, category) => {
  let query = `
    SELECT *
    FROM articles
    WHERE status = 'published'
  `;

  const values = [];
  let i = 1;

  if (category) {
    query += ` AND LOWER(category) = LOWER($${i})`;
    values.push(category);
    i++;
  }

  query += ` ORDER BY id DESC LIMIT $${i}`;
  values.push(limit);
  i++;

  query += ` OFFSET $${i}`;
  values.push(offset);

  const result = await pool.query(query, values);
  return result.rows;
};
// Admin
export const getAllArticles = async (limit, offset) => {
  const result = await pool.query(
    ` SELECT *
    FROM articles
  
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
  `,
    [limit, offset],
  );
  return result.rows;
};

export const getArticlesByCategory = async (name) => {
  const result = await pool.query(
    `SELECT * FROM articles WHERE LOWER(category) = LOWER($1)`,
    [name],
  );

  return result.rows;
};
// Breaking News
export const getBreakingNewsService = async () => {
  const result = await pool.query(`
    SELECT id, title
    FROM articles
    WHERE is_breaking = true
    AND status = 'published'
    ORDER BY created_at DESC
    LIMIT 5
  `);

  return result.rows;
};
