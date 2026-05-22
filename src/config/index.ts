// src/config/index.ts

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT || 3000,
  connection_string: process.env.DATABASE_URI as string,
  jwt_secret: process.env.JWT_SECRET as string,
  
};

export default config;
