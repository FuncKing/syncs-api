import { Header, Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { TOKEN_KEY, WHITE_LIST } from 'src/constant/constant';
import { Token } from 'src/modules/token/token.entity';
import { TokenService } from 'src/modules/token/token.service';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    const tokenValue = req.headers[`${TOKEN_KEY.toLowerCase()}`];
    let url = req.url;
    if (!url.endsWith('/')) {
      url += '/';
    }

    const is_ignored = WHITE_LIST.findIndex((path) => path === url) > -1;

    console.log(url, is_ignored);

    const token = await this.tokenService.findOne({ value: tokenValue });
    if (token) {
      const user = await this.userService.findById(token.userId);
      if (user) req.user = user;
    }

    if (is_ignored || req.user) {
      return next();
    }

    res.writeHead(403, { 'content-type': 'application/json' });
    res.write(JSON.stringify({ test: 'test' }));
    res.end();
  }
}
