import { describe, expect, it } from 'vitest';
import { EmptyHashedPasswordError } from '@/modules/user/domain/errors/empty-hashed-password.error';

describe('EmptyHashedPasswordError', () => {
  it('should create error with default message', () => {
    const defaultError = new EmptyHashedPasswordError();

    expect(defaultError).toBeInstanceOf(EmptyHashedPasswordError);
    expect(defaultError.message).toBe('Hashed password cannot be empty');
  });
});
