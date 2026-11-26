import { describe, expect, it, vi } from 'vitest';
import { User } from '@/modules/user/domain/entities/user';
import { Email } from '@/modules/user/domain/value-objects/email';
import { EmptyNameError } from '@/modules/user/domain/errors/empty-name.error';
import { EmptyHashedPasswordError } from '@/modules/user/domain/errors/empty-hashed-password.error';

describe('User entity', () => {
  const validEmail = Email.create('john.doe@example.com');

  const makeValidProps = () => ({
    id: 'user-123',
    name: 'John Doe',
    email: validEmail,
    hashedPassword: 'hashed_password_123',
  });

  describe('constructor', () => {
    it('should create a valid User instance with default timestamps', () => {
      const props = makeValidProps();
      const user = new User(props);

      expect(user.id).toBe('user-123');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john.doe@example.com');
      expect(user.passwordHash).toBe('hashed_password_123');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should preserve custom createdAt and updatedAt when provided', () => {
      const createdAt = new Date('2025-01-01T00:00:00Z');
      const updatedAt = new Date('2025-01-02T00:00:00Z');

      const user = new User({
        ...makeValidProps(),
        createdAt,
        updatedAt,
      });

      expect(user.createdAt).toEqual(createdAt);
      expect(user.updatedAt).toEqual(updatedAt);
    });

    it('should trim whitespace from name on creation', () => {
      const user = new User({
        ...makeValidProps(),
        name: '   Jane Doe   ',
      });

      expect(user.name).toBe('Jane Doe');
    });

    it('should throw EmptyNameError when name is empty or whitespace', () => {
      expect(() => new User({ ...makeValidProps(), name: '' })).toThrow(EmptyNameError);
      expect(() => new User({ ...makeValidProps(), name: '   ' })).toThrow(EmptyNameError);
    });

    it('should throw EmptyHashedPasswordError when hashedPassword is empty or whitespace', () => {
      expect(() => new User({ ...makeValidProps(), hashedPassword: '' })).toThrow(
        EmptyHashedPasswordError,
      );
      expect(() => new User({ ...makeValidProps(), hashedPassword: '   ' })).toThrow(
        EmptyHashedPasswordError,
      );
    });
  });

  describe('rename', () => {
    it('should update the user name, trim whitespace, and update updatedAt', () => {
      vi.useFakeTimers();
      const initialDate = new Date('2026-01-01T10:00:00Z');
      vi.setSystemTime(initialDate);

      const user = new User(makeValidProps());

      const laterDate = new Date('2026-01-01T10:05:00Z');
      vi.setSystemTime(laterDate);

      user.rename('  New Name  ');

      expect(user.name).toBe('New Name');
      expect(user.createdAt).toEqual(initialDate);
      expect(user.updatedAt).toEqual(laterDate);

      vi.useRealTimers();
    });

    it('should throw EmptyNameError when renaming to an invalid name', () => {
      const user = new User(makeValidProps());

      expect(() => user.rename('')).toThrow(EmptyNameError);
      expect(() => user.rename('   ')).toThrow(EmptyNameError);
    });
  });

  describe('changeHashedPassword', () => {
    it('should update hashedPassword and update updatedAt', () => {
      vi.useFakeTimers();
      const initialDate = new Date('2026-01-01T10:00:00Z');
      vi.setSystemTime(initialDate);

      const user = new User(makeValidProps());

      const laterDate = new Date('2026-01-01T10:10:00Z');
      vi.setSystemTime(laterDate);

      user.changeHashedPassword('new_hashed_password_456');

      expect(user.passwordHash).toBe('new_hashed_password_456');
      expect(user.createdAt).toEqual(initialDate);
      expect(user.updatedAt).toEqual(laterDate);

      vi.useRealTimers();
    });

    it('should throw EmptyHashedPasswordError when changing to an empty password', () => {
      const user = new User(makeValidProps());

      expect(() => user.changeHashedPassword('')).toThrow(EmptyHashedPasswordError);
      expect(() => user.changeHashedPassword('   ')).toThrow(EmptyHashedPasswordError);
    });
  });
});
