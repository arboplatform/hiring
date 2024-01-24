import { Express } from "express";
import { usersRoutes } from "./usersRoutes";
import { propertiesRoutes } from "./propertiesRoutes";

export const appRoutes = (app: Express) => {
  usersRoutes(app);
  propertiesRoutes(app);
};
