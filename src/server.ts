import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/db.js";
const mainserver = async() => {
    initDB()
  app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);
  });
};


mainserver()