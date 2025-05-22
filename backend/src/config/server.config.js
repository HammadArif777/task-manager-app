import { app } from "../../app.js";
import connectDB from "./db.config.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Attempt to connect to the DB
    await connectDB();
    console.log("✅ Database connected successfully");

    // Only start server after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Exit process with failure
  }
};

export { startServer };
