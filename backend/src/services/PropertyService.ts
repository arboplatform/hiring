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
    const updateData: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      // Verificando se cada propriedade é aninhada, ou seja se e objeto e nao e array
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        // Se for aninhada (objeto do address) ele atualiza o valor que esta vindo
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          updateData[`${key}.${nestedKey}`] = nestedValue;
        }
      } else {
        // Se não-aninhadas
        updateData[key] = value;
      }
    }
    console.log('updateDataupdateData', updateData);
    return Property.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  }

  async deleteProperty(id: string): Promise<any> {
    return Property.findByIdAndDelete(id, {
      returnOriginal: false,
    });
  }
}
