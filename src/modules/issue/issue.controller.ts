import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { issueServices } from "./issue.service.js";

const issueCreate = async (req: Request, res: Response) => {
  const reporter_id = req.user?.id;
  try {
    const result = await issueServices.createIssue(req.body, reporter_id);

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

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueServices.getAllIssues(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "get all issues",
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

const getSingleIssue = async (req: Request, res: Response) => {
  
  try {
    // type gurd 
   const issueId: string = typeof req.params.id === 'string' ? req.params.id : '';    
    const result = await issueServices.getSingleIssue(issueId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "get single issue",
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
  getAllIssues,
  getSingleIssue,
};
