import { Pool } from "pg";
import config from "../config/index.js";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.connect()
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};