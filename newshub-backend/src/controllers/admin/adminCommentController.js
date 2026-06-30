import {
  getAllCommentsService,
  updateCommentStatusService,
  deleteCommentService,
} from "../../services/commentService.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await getAllCommentsService();

    res.json(comments);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const comment = await updateCommentStatusService(id, status);

    res.json(comment);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCommentService(id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
