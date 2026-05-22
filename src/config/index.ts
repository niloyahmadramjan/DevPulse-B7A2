import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI missing");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing");
}

const config = {
  port: process.env.PORT || 3000,
  connection_string: process.env.DATABASE_URI,
  jwt_secret: process.env.JWT_SECRET,
};

export default config;