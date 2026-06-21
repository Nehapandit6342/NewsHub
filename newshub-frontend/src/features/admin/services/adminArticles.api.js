import api from "../../../api/axios";

// GET ALL (admin)
export const getAdminArticles = async () => {
  const res = await api.get("/admin/articles");
  return res.data.data;
};

// CREATE
export const createArticle = async (formData) => {
  const res = await api.post("/admin/articles", formData);
  return res.data.data;
};

// UPDATE
export const updateArticle = async ({ id, formData }) => {
  const res = await api.put(`/admin/articles/${id}`, formData);
  return res.data.data;
};

// DELETE
export const deleteArticle = async (id) => {
  const res = await api.delete(`/admin/articles/${id}`);
  return res.data.data;
};
