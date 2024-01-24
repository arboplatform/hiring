import { Express } from "express";

const propertiesRoutes = (app: Express) => {
  app.use("/properties");
};

export { propertiesRoutes };
