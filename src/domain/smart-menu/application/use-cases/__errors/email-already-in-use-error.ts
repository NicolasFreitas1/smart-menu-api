import { UseCaseError } from '@/core/errors/use-cases-error';

export class EmailAlreadyInUseError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`E-mail "${identifier}" is already in use`);
  }
}
