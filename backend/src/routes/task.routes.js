import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

// Routes for creating and listing tasks
router.route("/").post(createTask).get(getAllTasks);

// Routes for single task operations
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
