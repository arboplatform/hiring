import { Response } from "express";
import { RequestCustomBody } from "../@types/custom";
import { IPropertyCreate } from "../interfaces/PropertyInterface";
import { PropertiesService } from "../services/PropertiesService";

export class PropertiesController {
  private service = new PropertiesService();

  async create(req: RequestCustomBody<IPropertyCreate>, res: Response) {
    const propertyCreated = await this.service.create(req.body, req.user);

    return res.status(201).json(propertyCreated);
  }
}
