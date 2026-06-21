import api from "./axios";

export const getStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

export const getRecentArticles = async () => {
  const res = await api.get("/admin/recent-articles");
  return res.data;
};

export const getRecentComments = async () => {
  const res = await api.get("/admin/recent-comments");
  return res.data;
};
// update
export const updateCommentStatus = async ({ id, status }) => {
  const res = await api.put(`/admin/comments/${id}`, { status });
  return res.data;
};
// delete
export const deleteComment = async (id) => {
  const res = await api.delete(`/admin/comments/${id}`);
  return res.data;
};
// GET ALL COMMENTS (ADMIN)
export const getAdminComments = async () => {
  const res = await api.get("/admin/comments");
  return res.data || [];
};
