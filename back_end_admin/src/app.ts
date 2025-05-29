import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/index.route";
import morgan from "morgan";
import { errorHandler, notFoundHandler, unhandledRejectionHandler } from './middleware/error-handler.middleware';

const app: Application = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Healthcare API is running");
});

// Register error handling middleware (must be after all routes)
app.use(notFoundHandler);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', unhandledRejectionHandler);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

export default app;
