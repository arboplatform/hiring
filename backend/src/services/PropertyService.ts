import { CreatePropertyDto } from '../dtos';
import { IProperty, Property } from '../models';

export class PropertyService {
  async createProperty(data: CreatePropertyDto): Promise<IProperty> {
    const newProperty = new Property(data);
    await newProperty.save();
    const responseCreateProperty: IProperty = newProperty.toObject();
    return responseCreateProperty;
  }
}
