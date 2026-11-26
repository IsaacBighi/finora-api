import { describe, expect, it } from 'vitest';
import { EmptyNameError } from '@/modules/user/domain/errors/empty-name.error';

describe('EmptyNameError', () => {
  it('should create error with default message', () => {
    const defaultError = new EmptyNameError();

    expect(defaultError).toBeInstanceOf(EmptyNameError);
    expect(defaultError.message).toBe('Name cannot be empty');
  });
});
