import api from "./axios";

export const getComments = (articleId) => api.get(`/comments/${articleId}`);

export const addComment = (data) => api.post(`/comments`, data);
