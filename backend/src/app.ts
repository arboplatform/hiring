import express from "express";
import { errorMiddleware } from "./middlewares";
import { appRoutes } from "./routes";
import "express-async-errors";
import cors, { CorsOptions } from "cors";

const corsOption: CorsOptions = {
  origin: "*",
};
const app = express();

app.use(express.json());
app.use(cors(corsOption));

appRoutes(app);

app.use(errorMiddleware);
app.listen(8001);
