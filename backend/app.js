import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models/index.js";
import { router } from "./routes.js";
import { NotFoundError } from "./utils/errors.js";

// @TODO: UPDATE DEPENDENCIES!

// Initialize environment variables
config();

// Create express application
const app = express();

// Register body parser middleware
app.use(bodyParser.json());

// Register app router middleware
app.use(router);

// Register 404 handler
app.all("*", (req, res, next) => {
  return next(new NotFoundError());
});

// Register global error handling middleware
app.use((error, req, res, next) => {
  error.statusCode ??= 500;
  console.error(error);

  if (process.env.NODE_ENV === "production") {
    if (error.isOperational)
      return res
        .status(error.statusCode)
        .json({
          success: false,
          message: error.message,
          errors: error.errors,
        });
    else
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal server error",
        });
  }

  return res
    .status(error.statusCode)
    .json({
      success: false,
      message: error.message,
      errors: error.errors,
      stackTrace: error.stack,
    });
});

// Test database connection and start express listener
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`));
  })
  .catch((error) => console.error("Unable to connect to the database: ", error));
