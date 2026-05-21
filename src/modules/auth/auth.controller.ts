import type { Request, Response } from "express";
import { authServices } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUser(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error";

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
      error: errMessage,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error";

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
      error: errMessage,
    });
  }
};

export const signupController = {
  signup,
  login
};