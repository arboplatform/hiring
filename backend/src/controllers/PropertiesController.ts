import { Response, Request } from "express";
import { RequestCustomBody } from "../@types/custom";
import {
  IPropertyCreate,
  IPropertyUpdate,
} from "../interfaces/PropertyInterface";
import { PropertiesService } from "../services/PropertiesService";

export class PropertiesController {
  private service = new PropertiesService();

  async create(req: RequestCustomBody<IPropertyCreate>, res: Response) {
    const propertyCreated = await this.service.create(req.body, req.user);

    return res.status(201).json(propertyCreated);
  }

  async findAll(_req: Request, res: Response) {
    const allProperties = await this.service.findAll();

    return res.json(allProperties);
  }

  async update(
    req: Request<
      {
        propertyId: string;
        addressId: string;
      },
      any,
      IPropertyUpdate
    >,
    res: Response
  ) {
    const propertyUpdate = await this.service.update(
      req.body,
      parseInt(req.params.propertyId),
      parseInt(req.params.addressId)
    );

    res.status(200).json(propertyUpdate);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await this.service.delete(parseInt(req.params.id));

    return res.status(204).json();
  }
}
