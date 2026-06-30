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
// BULK DELETE
export const bulkDeleteArticles = async ({ ids }) => {
  const res = await api.delete("/admin/articles/bulk", {
    data: { ids },
  });

  return res.data;
};

// BULK ARCHIVE
export const bulkArchiveArticles = async ({ ids }) => {
  const res = await api.patch("/admin/articles/bulk-archive", {
    ids,
  });

  return res.data;
};

// APPROVE ARTICLE
export const approveArticle = async (id) => {
  const res = await api.patch(`/admin/articles/${id}/approve`);

  return res.data;
};
