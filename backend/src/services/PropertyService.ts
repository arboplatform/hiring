import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';
import { IProperty, Property } from '../models';

export class PropertyService {
  async createProperty(data: CreatePropertyDto): Promise<IProperty> {
    const newProperty = new Property(data);
    await newProperty.save();
    const responseCreateProperty: IProperty = newProperty.toObject();
    return responseCreateProperty;
  }

  async getProperty(): Promise<IProperty[]> {
    return Property.find();
  }

  async getByIdProperty(id: string): Promise<IProperty> {
    return Property.findById(id);
  }

  async updateProperty(
    id: string,
    data: UpdatePropertyDto,
  ): Promise<IProperty> {
    return Property.findByIdAndUpdate(id, data, {
      returnOriginal: false,
    });
  }
}
