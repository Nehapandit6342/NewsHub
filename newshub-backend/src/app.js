import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import adminRoutes from "./routes/admin.routes.js";
import articleRoutes from "./routes/article.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import adminCommentRoutes from "./routes/adminComment.routes.js";
import editorRoutes from "./routes/editor.routes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "NewsHub API Running 🚀" });
});

app.use("/api/admin/comments", adminCommentRoutes);

app.use("/api/articles", articleRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/editors", editorRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/comments", commentRoutes);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  next();
});

export default app;
