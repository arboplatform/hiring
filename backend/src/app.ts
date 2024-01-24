import express from "express";
import { errorMiddleware } from "./middlewares";
import { appRoutes } from "./routes";
import "express-async-errors";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);
app.listen(8001);
