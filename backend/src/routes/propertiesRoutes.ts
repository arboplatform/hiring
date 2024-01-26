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
  router.get(
    "",
    isAuthenticatedMiddleware({ required: true }),
    controller.findAll.bind(controller)
  );
  router.patch(
    "/:propertyId/address/:addressId",
    isAuthenticatedMiddleware({ required: true }),
    validationMiddleware(createPropertyValidate),
    controller.update.bind(controller)
  );
  router.delete(
    "/:id",
    isAuthenticatedMiddleware({ required: true }),
    controller.delete.bind(controller)
  );

  app.use("/properties", router);
};

export { propertiesRoutes };
