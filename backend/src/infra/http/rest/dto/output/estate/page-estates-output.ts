import { Paginated } from '../../../common/dto/models/paginated';
import { EstateResponse } from '../../models/estate';

export class EstatePager extends Paginated<EstateResponse>() {}
