import { User } from "../entities/User";

export interface IUserCreate
  extends Pick<User, "email" | "name" | "password"> {}

export interface IUserAuth extends Pick<User, "email" | "password"> {}