import { describe, expect, it } from 'vitest';
import { EmailAlreadyInUseError } from '@/modules/user/domain/errors/email-already-in-use.error';

describe('EmailAlreadyInUseError', () => {
  it('should create error with default message', () => {
    const defaultError = new EmailAlreadyInUseError();

    expect(defaultError).toBeInstanceOf(EmailAlreadyInUseError);
    expect(defaultError.message).toBe('Email already in use');
  });
});
