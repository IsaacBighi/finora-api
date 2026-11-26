import { InvalidEmailError } from '../errors/invalid-email.error';

export class Email {
  private readonly _value;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(email: string): Email {
    const formattedEmail = email.trim().toLocaleLowerCase();

    if (!this.validate(formattedEmail)) throw new InvalidEmailError();

    return new Email(formattedEmail);
  }

  public static validate(email: string): boolean {
    if (!email || email.length > 254) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  public get value(): string {
    return this._value;
  }
}
