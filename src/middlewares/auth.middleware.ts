import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tokenUtil } from '@utils';
import { errorMessages } from '@constants';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const data = tokenUtil.verifyJwtToken(req.headers.authorization);
      res.locals.user = data.id;
    } catch (error) {
      return res.status(403).json({ statusCode: 403, message: errorMessages.forbidden });
    }
    next();
  }
}
