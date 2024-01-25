import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { EntityNotFoundError } from "typeorm";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const errorMiddleware = (
  err: any,
  _request: Request,
  response: Response,
  _: NextFunction
) => {
  console.error(err);

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

  if (err instanceof ZodError) {
    return response.status(500).json(err.format());
  }

  if (err instanceof JsonWebTokenError) {
    return response.status(401).json({
      status: "Unathorized",
      code: 401,
      message: "Invalid token",
    });
  }

  return response.status(500).json({
    status: "error",
    code: 500,
    message: "Internal server error",
  });
};
