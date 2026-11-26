import { describe, expect, it } from 'vitest';
import { InvalidEmailError } from '@/modules/user/domain/errors/invalid-email.error';

describe('InvalidEmailError', () => {
  it('should create error with default message', () => {
    const defaultError = new InvalidEmailError();
    const customError = new InvalidEmailError('johndoeexample.com');

    expect(defaultError).toBeInstanceOf(InvalidEmailError);
    expect(defaultError.message).toBe('Invalid email adress');
    expect(customError.message).toBe('The mail johndoeexample.com is invalid');
  });
});
