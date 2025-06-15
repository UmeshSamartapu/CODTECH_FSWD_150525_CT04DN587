const socket = io();

// Join room form
document.getElementById("join-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const room = document.getElementById("room").value.trim();

  if (username && room) {
    socket.emit("join room", { username, room });

    // Hide join form and show chat
    document.getElementById("join-form").style.display = "none";
    document.getElementById("chat-box").style.display = "block";
  }
});

// Sending a message
document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit("chat message", message);
    messageInput.value = "";
  }
});

// Receive chat message
socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messages").appendChild(li);
});

// Receive join/leave messages
socket.on("user notification", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  li.style.fontStyle = "italic";
  li.style.color = "gray";
  document.getElementById("messages").appendChild(li);
});
