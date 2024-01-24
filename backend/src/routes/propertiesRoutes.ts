import { Express } from "express";

const propertiesRoutes = (app: Express) => {
  app.use(
    "/properties",
    app.get("", (req, res) => {
      return res.json("ok");
    })
  );
};

export { propertiesRoutes };
