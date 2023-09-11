// src/typeorm-error.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TypeORMError } from 'typeorm';
import { translateErrorMessage } from '../functions/typeorm.utils';

@Injectable()
export class TypeormErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof TypeORMError) {
          const translatedMessage = translateErrorMessage(error.message);
          error.message = translatedMessage;
        }
        return throwError(() => error);
      }),
    );
  }
}
