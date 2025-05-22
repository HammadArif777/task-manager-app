import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import errorHandler from "./src/middlewares/error_handler.middleware.js";
import taskRoutes from "./src/routes/task.routes.js";
dotenv.config();
const app = express();
app.use(express.json({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use("/api/v1/tasks", taskRoutes);
app.use(errorHandler);
export { app };
