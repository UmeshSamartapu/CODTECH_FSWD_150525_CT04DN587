const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  _id: String, // Primary ID
  id: String,  // Optional redundant field for easier querying
  title: { type: String, default: "Untitled" },
  content: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now } // Optional: track creation time
});

module.exports = mongoose.model("Document", DocumentSchema);
