import { IUserAutheticated } from "../../src/interfaces/UserInterface";

declare global {
  namespace Express {
    interface Request {
      user: IUserAutheticated;
    }
  }
}
