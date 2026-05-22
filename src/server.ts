import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/db.js";

const mainserver = async () => {
  try {
    await initDB();

    app.listen(config.port, () => {
      console.log(
        `Server running on http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

mainserver();