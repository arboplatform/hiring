import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { EntityNotFoundError } from "typeorm";

export const errorMiddleware = (
  err: any,
  _request: Request,
  response: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof EntityNotFoundError) {
    return response.status(404).json({
      status: "Not found",
      code: 404,
      message: "Resource not found",
    });
  }

  return response.status(500).json({
    status: "error",
    code: 500,
    message: "Internal server error",
  });
};
