import { NextFunction, Request, Response } from "express";
import { IUserAutheticated } from "../interfaces/UserInterface";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { userWithoutPassword } from "../validations/user";

type IsAuthenticatedMiddlewareParameters = {
  required?: boolean;
  response?: boolean;
};

export const isAuthenticatedMiddleware =
  ({ required, response }: IsAuthenticatedMiddlewareParameters) =>
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
      const userValidate = userWithoutPassword.parse(user);

      if (response) {
        return res.json(userValidate);
      }

      req.user = userValidate as IUserAutheticated;
    }

    return next();
  };
