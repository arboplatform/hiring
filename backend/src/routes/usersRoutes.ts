import { Router, Express } from "express";
import { UsersController } from "../controllers/UsersController";
import { isAuthenticatedMiddleware } from "../middlewares";

const usersRoutes = (app: Express) => {
  const routes = Router();
  const controller = new UsersController();

  routes.post("", controller.create.bind(controller));
  routes.get("", controller.findAll.bind(controller));
  routes.post("/auth", controller.auth.bind(controller));
  routes.post(
    "/is_authenticated",
    isAuthenticatedMiddleware({ required: true, response: true })
  );

  app.use("/users", routes);
};

export { usersRoutes };
