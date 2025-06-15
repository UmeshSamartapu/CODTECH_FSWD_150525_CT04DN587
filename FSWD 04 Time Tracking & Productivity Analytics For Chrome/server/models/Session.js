import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: String,
  hostname: String,
  timeSpent: Number,
  date: { type: Date, default: () => new Date().setHours(0,0,0,0) }
});

export default mongoose.model("Session", sessionSchema);
