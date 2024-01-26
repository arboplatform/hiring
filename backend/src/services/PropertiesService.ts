import { AppDataSource } from "../data-source";
import { Address } from "../entities/Address";
import { Property } from "../entities/Property";
import { IPropertyCreate } from "../interfaces/PropertyInterface";
import { IUserAutheticated } from "../interfaces/UserInterface";
import {
  listPropertyValidate,
  propertyValidate,
} from "../validations/property";

export class PropertiesService {
  private repositoryProperty = AppDataSource.getRepository(Property);
  private repositoryAddress = AppDataSource.getRepository(Address);

  async create(property: IPropertyCreate, user: IUserAutheticated) {
    const addressCreated = this.repositoryAddress.create(property.address);
    const propertyCreated = this.repositoryProperty.create({
      ...property,
      user,
    });

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const addressSave = await queryRunner.manager.save(addressCreated);
      propertyCreated.address = addressSave;

      const property = await queryRunner.manager.save(propertyCreated);
      await queryRunner.commitTransaction();

      return propertyValidate.parse(property);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const allProperties = await this.repositoryProperty.find({
      relations: { user: true, address: true },
    });

    return listPropertyValidate.array().parse(allProperties);
  }

  async delete(id: number) {
    await this.repositoryProperty.delete({ id });

    return null;
  }
}
