import api from "./axios";

// GET EDITORS
export const getEditors = async () => {
  const res = await api.get("/editors");
  return res.data;
};

// CREATE EDITOR
export const createEditor = async (data) => {
  const res = await api.post("/editors/create-editor", data);
  return res.data;
};

// DELETE EDITOR
export const deleteEditor = async (id) => {
  const res = await api.delete(`/editors/${id}`);
  return res.data;
};
