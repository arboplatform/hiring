import { Request } from "express";

interface RequestCustomBody<T> extends Request {
  body: T;
}
