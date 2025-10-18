import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import sequelize from "./utils/database.js";
import { router } from "./routes.js";

// Initialize environment variables
config();

// Setup express
const app = express();
app.use(bodyParser.json());

// Register router
app.use(router);

// Global error handling
app.use((error, req, res, next) => {
  console.error(error);

  return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      message: "Internal server error",
    });
});

// DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
  })
  .catch((error) => console.error("Unable to connect to the database: ", error));
