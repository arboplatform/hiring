import { NextFunction, Request, Response } from "express";
import { IUserAutheticated } from "../interfaces/UserInterface";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const defaultParams = {
  required: false,
  response: false,
};

export const isAuthenticatedMiddleware =
  ({ required = false, response = false } = defaultParams) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token && required) {
      throw new AppError(401, "Without authorization");
    }

    if (token) {
      const repository = AppDataSource.getRepository(User);
      const { email, id }: IUserAutheticated = jwt.verify(
        token,
        process.env.SECRET_KEY!
      ) as IUserAutheticated;
      const user = await repository.findOneByOrFail({ email, id });

      if (response) {
        return res.json(user);
      }

      req.user = user as IUserAutheticated;
    }

    return next();
  };
