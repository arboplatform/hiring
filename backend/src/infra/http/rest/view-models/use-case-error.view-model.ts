import { UseCaseError } from '@application/errors/use-case-error';

export class UseCaseErrorViewModel {
  static toResponse(error: UseCaseError) {
    return new Error(error.message);
  }
}
