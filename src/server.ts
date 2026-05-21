import app from "./app.js";
import config from "./config/index.js";
const mainserver = () => {
  app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);
  });
};


mainserver()