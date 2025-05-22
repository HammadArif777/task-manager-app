import Task from "../models/task.model.js";
import ApiError from "../utils/api_error.util.js";
import ApiResponse from "../utils/api_response.util.js";
// Create Task
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw new ApiError(400, "Title & description is required");
    }
    const task = await Task.create(req.body);
    res
      .status(201)
      .json(ApiResponse({ data: task, success: "Task is created successfully!", statusCode: 201 }));
  } catch (error) {
    next(error);
  }
};

// Get All Tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(
      ApiResponse({
        data: {
          tasks,
          totalCount: tasks.length,
        },
        success: true,
        message: "ok",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
};

// Get Task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new ApiError(404, "Task not found!");
    res.json(ApiResponse({ data: task, success: true, message: "ok", statusCode: 200 }));
  } catch (error) {
    next(error);
  }
};

// Update Task
const updateTask = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) throw new ApiError(404, "Task not found");
    res.status(200).json(
      ApiResponse({
        data: task,
        success: true,
        message: "Task updated successfully",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
};

// Delete Task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) throw new ApiError(404, "Task not found");
    res.json(
      ApiResponse({
        data: task,
        success: true,
        message: "Task is deleted successfully",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
};
export { getAllTasks, getTaskById, deleteTask, updateTask, createTask };
