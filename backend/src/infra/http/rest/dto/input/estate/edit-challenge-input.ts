import { PartialType } from '@nestjs/mapped-types';

import { CreateEstateInput } from './create-estate-input';

export class EditChallengeInput extends PartialType(CreateEstateInput) {}
