import {
  getAllEditorsService,
  createEditorService,
  deleteEditorService,
} from "../services/editor.service.js";

// GET EDITORS
export const getEditorsController = async (req, res) => {
  try {
    const editors = await getAllEditorsService();
    res.json(editors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// CREATE EDITOR
export const createEditorController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const editor = await createEditorService(name, email, password);

    res.status(201).json(editor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE EDITOR
export const deleteEditorController = async (req, res) => {
  try {
    await deleteEditorService(req.params.id);

    res.json({ message: "Editor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
