import { Router, Express } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = (app: Express) => {
  const routes = Router();
  const controller = new UsersController();

  routes.post("", controller.create.bind(controller));
  routes.get("", controller.findAll.bind(controller));
  routes.post("/auth", controller.auth.bind(controller));

  app.use("/users", routes);
};

export { usersRoutes };
