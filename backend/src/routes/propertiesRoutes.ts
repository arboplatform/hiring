import { Express, Router } from "express";
import { PropertiesController } from "../controllers/PropertiesController";
import { isAuthenticatedMiddleware } from "../middlewares";

const propertiesRoutes = (app: Express) => {
  const router = Router();
  const controller = new PropertiesController();

  router.post(
    "",
    isAuthenticatedMiddleware({ required: true }),
    controller.create.bind(controller)
  );

  app.use("/properties", router);
};

export { propertiesRoutes };
