import { PartialType } from '@nestjs/mapped-types';

import { CreateEstateInput } from './create-estate-input';

export class EditEstateInput extends PartialType(CreateEstateInput) {}
