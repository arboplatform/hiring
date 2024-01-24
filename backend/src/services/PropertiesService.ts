import { AppDataSource } from "../data-source";
import { Address } from "../entities/Address";
import { Property } from "../entities/Property";
import { IPropertyCreate } from "../interfaces/PropertyInterface";
import { IUserAutheticated } from "../interfaces/UserInterface";

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
      
      await queryRunner.manager.save(propertyCreated);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
