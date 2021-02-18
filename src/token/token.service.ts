import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(userId: string): Promise<Token> {
    const token = new Token();
    token.userId = userId;
    token.setToken();
    await token.save();
    return token;
  }
}
