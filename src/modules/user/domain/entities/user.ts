import { EmptyHashedPasswordError } from '../errors/empty-hashed-password.error';
import { EmptyNameError } from '../errors/empty-name.error';
import { Email } from '../value-objects/email';

export interface UserProps {
  id: string;
  name: string;
  email: Email;
  hashedPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private readonly _id: string;
  private _name: string;
  private readonly _email: Email;
  private _hashedPassword: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserProps) {
    const now = new Date();

    this._id = props.id;
    this._name = User.validateName(props.name);
    this._email = props.email;
    this._hashedPassword = User.validateHashedPassword(props.hashedPassword);
    this._createdAt = props.createdAt ?? now;
    this._updatedAt = props.updatedAt ?? now;
  }

  private static validateName(name: string) {
    const trimmed = name.trim();
    if (!trimmed) throw new EmptyNameError();
    return trimmed;
  }

  private static validateHashedPassword(hashedPassword: string): string {
    if (!hashedPassword || !hashedPassword.trim()) {
      throw new EmptyHashedPasswordError();
    }
    return hashedPassword;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email.value;
  }

  get passwordHash(): string {
    return this._hashedPassword;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  rename(name: string): void {
    this._name = User.validateName(name);
    this.touch();
  }

  changeHashedPassword(hashedPassword: string) {
    this._hashedPassword = User.validateHashedPassword(hashedPassword);
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}
