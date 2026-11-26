import { DomainError } from '@/shared/errors/domain-error';

export class EmptyNameError extends DomainError {
  constructor() {
    super('Name cannot be empty');
  }
}
