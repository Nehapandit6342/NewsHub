import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

// ✅ MUST be declared BEFORE use
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_article", (articleId) => {
    socket.join(`article_${articleId}`);
  });

  socket.on("new_comment", (data) => {
    io.to(`article_${data.article_id}`).emit("receive_comment", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ USE server.listen (NOT Server.listen)
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
