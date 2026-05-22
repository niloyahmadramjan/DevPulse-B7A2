import { Pool } from "pg";
import config from "../config/index.js";
import { dbschema } from "./schema.js";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query("SELECT 1");

    await dbschema();

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
