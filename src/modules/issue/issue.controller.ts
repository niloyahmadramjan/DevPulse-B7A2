import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { issueServices } from "./issue.service.js";

const issueCreate = async (req: Request, res: Response) => {
  try {
    const result = await issueServices.createIssue(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
      error: errMessage,
    });
  }
};

export const issueController = {
  issueCreate,
};
