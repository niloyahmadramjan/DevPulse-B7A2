import bcrypt from "bcryptjs";
import { pool } from "../../db/db.js";
import type { IUser } from "../../types/user.interface.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import AppError from "../../utils/AppError.js";
import type { TLoginUser } from "../../types/login.types.js";

const createUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const normalizedEmail = email.toLowerCase();

  const isUserExist = await pool.query(
    `
        SELECT id, name, email, password, role, created_at, updated_at
        FROM users
        WHERE email = $1
        `,
    [normalizedEmail],
  );
  if (isUserExist.rows.length !== 0) {
    throw new AppError(409, "User already exists");
  }
  const allowedRoles = ["contributor", "maintainer"];

  if (role && !allowedRoles.includes(role)) {
    throw new AppError(400, "Invalid role");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users( name, email, password,role) VALUES($1,$2,$3,  COALESCE($4, 'contributor')) RETURNING id, name, email, role, created_at, updated_at
  `,
    [name, email, hashPass, role],
  );

  return result.rows[0];
};

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // Find user by email
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE email = $1
    `,
    [email],
  );

  // User not found
  if (result.rows.length === 0) {
    throw new AppError(400, "Invalid credentials");
  }

  const user = result.rows[0];

  // Compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(400, "Invalid credentials");
  }

  // JWT Payload
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  // Generate token
  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1h",
  });

  // Return response
  return {
    token,
    user: {
      ...jwtPayload,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const authServices = {
  createUser,
  loginUser,
};
