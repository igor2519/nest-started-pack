import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import databaseErrors from '../constants/databaseErrors';
import errorMessages from '../constants/errorMessages';
import { catchError, Observable } from 'rxjs';

@Injectable()
export default class GlobalErrorHandler implements NestInterceptor {
  private logger = new Logger('Global error handler');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.code && error.code === databaseErrors.duplicateValue) {
          this.logger.debug(error);
          throw new HttpException(
            errorMessages.entityAlreadyExists,
            HttpStatus.CONFLICT,
          );
        }
        if (error.status) {
          this.logger.debug(error);
          throw new HttpException(error.message, error.status);
        }
        throw error;
      }),
    );
  }
}
