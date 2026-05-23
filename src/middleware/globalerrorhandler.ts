import type {
  NextFunction,
  Request,
  Response,
} from "express";
import AppError from "../utils/AppError.js";


const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }

  // Normal Error
  if (error instanceof Error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }

  // Unknown Error
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: "Unknown error",
  });
};

export default globalErrorHandler;