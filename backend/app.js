import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models/index.js";
import { router } from "./routes.js";

// Initialize environment variables
config();

// Create express application
const app = express();

// Register body parser middleware
app.use(bodyParser.json());

// Register app router middleware
app.use(router);

// Register global error handling middleware
app.use((error, req, res, next) => {
  console.error(error);

  return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      message: "Internal server error",
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
