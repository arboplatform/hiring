import { Router, Express } from "express";
import { UsersController } from "../controllers/UsersController";
import { isAuthenticatedMiddleware } from "../middlewares";

const usersRoutes = (app: Express) => {
  const router = Router();
  const controller = new UsersController();

  router.post("", controller.create.bind(controller));
  router.get("", controller.findAll.bind(controller));
  router.post("/auth", controller.auth.bind(controller));
  router.post(
    "/is_authenticated",
    isAuthenticatedMiddleware({ required: true, response: true })
  );

  app.use("/users", router);
};

export { usersRoutes };
