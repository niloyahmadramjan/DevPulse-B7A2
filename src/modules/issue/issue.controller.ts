import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { issueServices } from "./issue.service.js";
import type { JwtPayload } from "jsonwebtoken";
import type { Params } from "../../types/param.type.js";
import AppError from "../../utils/AppError.js";

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
    if (error instanceof AppError) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        error: error.message,
      });
    }
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
    if (error instanceof AppError) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        error: error.message,
      });
    }
  }
};

const getSingleIssue = async (req: Request<Params>, res: Response) => {
  try {
    // type gurd
    const issueId = req.params.id;
    const result = await issueServices.getSingleIssue(issueId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "get single issue",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        error: error.message,
      });
    }
  }
};

const updateIssue = async (req: Request<Params>, res: Response) => {
  try {
    const user = req.user;
    const issueId = req.params.id;
    const payload = req.body;
    const result = await issueServices.updateIssue(issueId, user, payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        error: error.message,
      });
    }
  }
};

const deleteIssue = async (req: Request<Params>, res: Response) => {
  try {
    const user = req.user;
    const issueId = req.params.id;
    const result = await issueServices.deleteIssue(issueId, user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue delete successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        error: error.message,
      });
    }
  }
};

export const issueController = {
  issueCreate,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
