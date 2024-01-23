import express from "express";
import { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hellor ee World",
  });
});

app.use(errorMiddleware);

app.listen(8001);
