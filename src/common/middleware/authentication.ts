import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { TOKEN_KEY, WHITE_LIST } from 'src/constant/constant';
import { TokenService } from 'src/modules/token/token.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async use(req: any, res: any, next: () => void) {
    const tokenValue = req.headers[`${TOKEN_KEY.toLowerCase()}`];
    let url = req.url;
    if (!url.endsWith('/')) {
      url += '/';
    }

    const is_ignored = WHITE_LIST.findIndex((path) => path === url) > -1;

    const token = await this.tokenService.findOne({ value: tokenValue });
    if (token) {
      const user = await this.userService.findById(token.userId);
      if (user) {
        req.user = user;
      }
    }

    if (is_ignored || req.user) {
      return next();
    }

    throw new HttpException(
      {
        error: 'You must be login to access here',
      },
      HttpStatus.FORBIDDEN
    );
  }
}
