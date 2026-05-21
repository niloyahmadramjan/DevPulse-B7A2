import bcrypt from "bcryptjs";
import { pool } from "../../db/db.js";
import type { IUser } from "../../types/user.interface.js";

const createUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const isUserExist = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [email],
  );
  if (isUserExist.rows.length !== 0) {
    throw new Error("User already exists!");
  }
  const allowedRoles = ["contributor", "maintainer"];

  if (role && !allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users( name, email, password,role) VALUES($1,$2,$3,  COALESCE($4, 'contributor')) RETURNING id, name, email, role, created_at
  `,
    [name, email, hashPass, role],
  );

  return result.rows[0];
};

export const authServices = {
  createUser,
};
