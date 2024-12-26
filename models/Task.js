import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    enum: ["Priority 1", "Priority 2", "Priority 3", "No Priority"],
    default: "No Priority",
  },
  state: {
    type: String,
    enum: ["Not yet", "In progress", "Finished"],
    default: "not yet",
  },
  setReminder: {
    type: Boolean,
    default: false,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
