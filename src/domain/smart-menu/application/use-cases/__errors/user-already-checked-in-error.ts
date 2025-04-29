import { UseCaseError } from '@/core/errors/use-cases-error';

export class UserAlreadyCheckedInError extends Error implements UseCaseError {
  constructor() {
    super(`User already checked in today.`);
  }
}
