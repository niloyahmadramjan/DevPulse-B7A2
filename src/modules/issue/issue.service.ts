import type { JwtPayload } from "jsonwebtoken";
import { pool } from "../../db/db.js";
import type { Iissue } from "../../types/issue.Iinterface.js";
import { USER_ROLE } from "../../types/role.types.js";
import AppError from "../../utils/AppError.js";

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

  // i used AI for understanding this logic
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
   if (issues.rows.length === 0) {
    return {
      message: "No issue available",
      data: [],
    };
  }

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

   return {
    message: "Issues retrieved successfully",
    data: result,
  };
};

const getSingleIssue = async (id: string) => {
  const issueResult = await pool.query(
    `
    SELECT * FROM issues WHERE id = $1
    `,
    [id],
  );

   if (issueResult.rows.length === 0) {
    return {
      success: true,
      message: "No issue available",
      data: null,
    };
  }

  const issue = issueResult.rows[0];


  const userResult = await pool.query(
    `
      SELECT id, name,role FROM users WHERE id=$1
      `,
    [issue.reporter_id],
  );

   return {
    success: true,
    message: "Issue retrieved successfully",
    data: {
      ...issue,
      reporter: userResult.rows[0],
    },
  };

};
const updateIssue = async (
  issueId: string,
  user: JwtPayload,
  payload: Iissue,
) => {
  const issueResult = await pool.query(
    `
    SELECT * FROM issues WHERE id = $1
    `,
    [issueId],
  );
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not foud");
  }
  const issue = issueResult.rows[0];
  //check contributor rules and issue owner contributor verify
  if (user.role === USER_ROLE.contributor) {
    if (issue.reporter_id !== user.id) {
      throw new Error("Forbidden you are can't update this issue");
    }
  }

  if (issue.status !== "open") {
    throw new Error("You can only edit open issues");
  }

  const result = await pool.query(
    `
    UPDATE issues 
    SET 
    title = $1,
    description = $2,
    type = $3,
    updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [payload.title, payload.description, payload.type, issueId],
  );
  return result.rows[0];
};
const deleteIssue = async (issueId: string, user: JwtPayload) => {
  const issueResult = await pool.query(
    `
    SELECT * FROM issues WHERE id = $1
    `,
    [issueId],
  );
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not foud");
  }
  const issue = issueResult.rows[0];
  //check contributor rules and issue owner contributor verify
  if (user.role !== USER_ROLE.maintainer) {
    throw new Error("Forbidden you are can't delete this issue");
  }

  const result = await pool.query(
    `
   DELETE FROM issues WHERE id = $1
   
    `,
    [issueId],
  );
  return result.rows[0];
};

export const issueServices = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
