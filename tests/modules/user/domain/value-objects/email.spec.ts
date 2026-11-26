import { describe, expect, it } from 'vitest';
import { Email } from '@/modules/user/domain/value-objects/email';
import { InvalidEmailError } from '@/modules/user/domain/errors/invalid-email.error';

describe('Email value object', () => {
  describe('create', () => {
    it('should create a valid Email instance', () => {
      const email = Email.create('john.doe@example.com');

      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe('john.doe@example.com');
    });

    it('should trim whitespace and convert email to lowercase', () => {
      const email = Email.create('   John.Doe@Example.COM   ');

      expect(email.value).toBe('john.doe@example.com');
    });

    it('should throw InvalidEmailError when email format is invalid', () => {
      expect(() => Email.create('')).toThrow(InvalidEmailError);
      expect(() => Email.create('   ')).toThrow(InvalidEmailError);
      expect(() => Email.create('invalid-email')).toThrow(InvalidEmailError);
      expect(() => Email.create('john@')).toThrow(InvalidEmailError);
      expect(() => Email.create('@example.com')).toThrow(InvalidEmailError);
      expect(() => Email.create('john@example')).toThrow(InvalidEmailError);
      expect(() => Email.create('john doe@example.com')).toThrow(InvalidEmailError);
    });

    it('should throw InvalidEmailError when email exceeds 254 characters', () => {
      const longLocalPart = 'a'.repeat(245);
      const longEmail = `${longLocalPart}@example.com`; // 257 caracteres

      expect(() => Email.create(longEmail)).toThrow(InvalidEmailError);
    });
  });

  describe('validate', () => {
    it('should return true for valid emails', () => {
      expect(Email.validate('user@domain.com')).toBe(true);
      expect(Email.validate('user.name+tag@://domain.com')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(Email.validate('')).toBe(false);
      expect(Email.validate('user@domain')).toBe(false);
      expect(Email.validate('a'.repeat(245) + '@example.com')).toBe(false);
    });
  });
});
