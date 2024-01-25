import { Express, Router } from "express";
import { PropertiesController } from "../controllers/PropertiesController";
import { isAuthenticatedMiddleware } from "../middlewares";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { createPropertyValidate } from "../validations/property";

const propertiesRoutes = (app: Express) => {
  const router = Router();
  const controller = new PropertiesController();

  router.post(
    "",
    isAuthenticatedMiddleware({ required: true }),
    validationMiddleware(createPropertyValidate),
    controller.create.bind(controller)
  );

  app.use("/properties", router);
};

export { propertiesRoutes };
