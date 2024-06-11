import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class OptionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }

    next();
  }
}
