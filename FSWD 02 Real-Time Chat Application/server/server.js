require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/chatApp")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Mongoose schema
const messageSchema = new mongoose.Schema({
  room: String,
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Socket.io logic
io.on("connection", (socket) => {
  socket.on("join room", async ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    socket.join(room);

    socket.to(room).emit("user notification", `${username} joined the room`);

    try {
      const history = await Message.find({ room }).sort({ timestamp: -1 }).limit(20).lean();
      socket.emit("chat history", history.reverse());
    } catch (err) {
      console.error("❌ Failed to fetch chat history:", err);
    }
  });

  socket.on("chat message", async (msg) => {
    const messageData = {
      room: socket.room,
      username: socket.username,
      message: msg,
    };

    try {
      await Message.create(messageData);
      io.to(socket.room).emit("chat message", `${socket.username}: ${msg}`);
    } catch (err) {
      console.error("❌ Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    if (socket.username && socket.room) {
      socket.to(socket.room).emit("user notification", `${socket.username} left the room`);
    }
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
