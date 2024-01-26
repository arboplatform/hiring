import { RequestCustomBody } from "../@types/custom";
import { IUserAuth, IUserCreate } from "../interfaces/UserInterface";
import { UsersService } from "../services/UsersService";
import { Request, Response } from "express";

export class UsersController {
  private service = new UsersService();

  async create(req: RequestCustomBody<IUserCreate>, res: Response) {
    const userCreated = await this.service.create(req.body);

    return res.status(201).json(userCreated);
  }

  async findAll(_req: Request, res: Response) {
    const allUsers = await this.service.findAll();

    return res.json(allUsers);
  }

  async auth(req: RequestCustomBody<IUserAuth>, res: Response) {
    const token = await this.service.auth(req.body);

    return res.json(token);
  }
}
