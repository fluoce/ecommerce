import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDataType } from './types/response.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: ResponseDataType) => {
        const { message, ...rest } = data;
        return {
          statusCode: response.statusCode,
          success: true,
          message: message || '_OK',
          data: rest,
        };
      }),
    );
  }
}
