import { pool } from "../../db/db.js";
import type { Iissue } from "../../types/issue.Iinterface.js";

const createIssue = async (payload: Iissue) => {
  // const id = req.user.id
  const reporter_id = 1;

  const { title, description, type } = payload;

  // Validate issue type
  const allowedTypes = ["bug", "feature_request"];

  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid issue type");
  }

  // Validate title length
  if (title.length > 150) {
    throw new Error("Title cannot exceed 150 characters");
  }

  // Validate description length
  if (description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  // Insert issue
  const result = await pool.query(
    `
      INSERT INTO issues
      (
        title,
        description,
        type,
        reporter_id
      )
      VALUES ($1, $2, $3, $4)

      RETURNING
      id,
      title,
      description,
      type,
      status,
      reporter_id,
      created_at,
      updated_at
    `,
    [title, description, type, reporter_id],
  );

  return result.rows[0];
};

export const issueServices = {
  createIssue,
};
