import { pool } from "../../db/db.js";
import type { Iissue } from "../../types/issue.Iinterface.js";

const createIssue = async (payload: Iissue, reporter_id: number) => {
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

const getAllIssues = async (query: any) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues`;
  const conditions: string[] = [];
  const values: any[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(" AND ");
  }

  sql += ` ORDER BY created_at ${sort === "oldest" ? "ASC" : "DESC"}`;

  const issues = await pool.query(sql, values);

  // batch user fetch
  const reporterIds = issues.rows.map((i) => i.reporter_id);

  const users = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id = ANY($1)
    `,
    [reporterIds],
  );

  const result = issues.rows.map((issue) => ({
    ...issue,
    reporter: users.rows.find((u) => u.id === issue.reporter_id),
  }));

  return result;
};

export const issueServices = {
  createIssue,
  getAllIssues,
};
