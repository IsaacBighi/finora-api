import { DomainError } from '@/shared/errors/domain-error';

export class EmptyHashedPasswordError extends DomainError {
  constructor() {
    super('Hashed password cannot be empty');
  }
}
