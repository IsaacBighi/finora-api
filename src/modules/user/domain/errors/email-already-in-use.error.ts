import { DomainError } from '@/shared/errors/domain-error';

export class EmailAlreadyInUseError extends DomainError {
  constructor() {
    super('Email already in use');
  }
}
