import { NextFunction, Request, Response } from "express";
import { ZodOptional, AnyZodObject } from "zod";

export const validationMiddleware =
  (validate: AnyZodObject | ZodOptional<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parse = validate.parse(req.body);

    req.body = parse;

    return next();
  };