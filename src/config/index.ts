// src/config/index.ts

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT || 3000,
  connection_string: process.env.DATABASE_URI as string,
  jwtsecret: process.env.JWT_SECRET as string,
  refreshasecrect: process.env.JWT_REFRESH_SECRET as string,
  node_env: process.env.NODE_ENV as string
  
};

export default config;
