import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { ObjectID, Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async findOne(where: object): Promise<Token> {
    return this.tokenRepository.findOne(where);
  }

  async create(user: User): Promise<Token> {
    const token = new Token();
    token.userId = user.id.toString();
    token.generateToken(user);
    await token.save();
    return token;
  }
}
