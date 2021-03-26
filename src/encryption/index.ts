import * as crypto from 'crypto';

export default class Encryption {
  public hashed: string;

  public saltLength = 20;

  public salt: string;

  private text?: string;

  private secret: string = process.env.SECRET;

  private cryptAlgorithm = 'sha512';

  constructor(text?: string, salt?: string, saltLength?: number) {
    this.saltLength = saltLength || this.saltLength;
    this.text = text;
    this.salt = salt || this.generateSalt(this.saltLength);
    this.hashed = this.hash();
  }

  generateSalt(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  hash(): string {
    const hashed = crypto.createHmac(this.cryptAlgorithm, this.salt);

    hashed.update(this.text);

    this.hashed = hashed.digest('hex');

    return this.hashed;
  }
}
