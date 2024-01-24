import { Request, Response } from 'express';
import { PropertyService } from '../services';

export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const property = await this.propertyService.createProperty(req.body);
      return res.status(201).json(property);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Ops! Error desconhecido!' });
    }
  }

  async getProperty(req: Request, res: Response): Promise<Response> {
    try {
      const properties = await this.propertyService.getProperty();
      return res.status(201).json(properties);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Ops! Error desconhecido!' });
    }
  }

  async getByIdProperty(req: Request, res: Response): Promise<Response> {
    try {
      const property = await this.propertyService.getByIdProperty(
        req.params.id,
      );
      return res.status(201).json(property);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Ops! Error desconhecido!' });
    }
  }
}
