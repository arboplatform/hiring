import { Express } from "express";
import { usersRoutes } from "./usersRoutes";

export const appRoutes = (app: Express) => {
  usersRoutes(app);
};
