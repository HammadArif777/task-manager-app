import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title must be under 100 characters"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description must be under 500 characters"],
      unique: true,
    },
    deadline: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true; // Optional field — allow if not provided
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize to start of day
          return value >= today;
        },
        message: "Deadline cannot be in the past",
      },
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    important: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
