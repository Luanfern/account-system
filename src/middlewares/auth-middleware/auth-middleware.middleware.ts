import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddlewareMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.headers['authorization']) {
      const bearerToken = req.headers['authorization']?.split(" ")[1]
      console.log(bearerToken)
    }
    next();
  }
}
