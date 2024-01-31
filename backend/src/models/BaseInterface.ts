import { StatusEnum } from '../enums';

export interface BaseInterface {
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
