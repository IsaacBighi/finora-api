import { DomainError } from '@/shared/errors/domain-error';

export class InvalidEmailError extends DomainError {
  constructor(email?: string) {
    super(email ? `The mail ${email} is invalid ` : 'Invalid email adress');
  }
}
