import { AppDataSource } from "../data-source";
import { Property } from "../entities/Property";

export class PropertiesService {
  private repository = AppDataSource.getRepository(Property);

}
