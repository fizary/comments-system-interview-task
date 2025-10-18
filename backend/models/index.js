import { Sequelize } from "sequelize";
import config from "../config/config.js";

// Import all used models

// Initialize sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Create an object to hold all models
const models = {};

// Initialize associations
for (const model of Object.values(models))
  if (model.associate)
    model.associate(models);

export { sequelize, models };
