import type { NextFunction, Request, Response } from "express";
import Jwt, { type JwtPayload } from "jsonwebtoken";

import type { ROLES } from "../types/role.types.js";
import config from "../config/index.js";
import { pool } from "../db/db.js";

const isAuth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized access!",
        });
      }

      const decoded = Jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `,
        [decoded.email]
      );

      if (userData.rows.length === 0) {
        return res.status(404).json({
          status: false,
          message: "User couldn't be found!",
        });
      }

      const user = userData.rows[0];

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          status: false,
          message: "Access forbidden!",
        });
      }

      req.user = decoded;

      next();
    } catch (error: unknown) {
      return res.status(500).json({
        status: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };
};

export default isAuth;