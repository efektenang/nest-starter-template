import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        reqId: this.generateRequestId(),
        meta: {
          success: true,
          code: 20000,
          message: 'OK',
        },
        data,
      })),
    );
  }

  private generateRequestId(): string {
    return `${this.randomString()}-${this.randomString()}-${this.randomString()}`;
  }

  private randomString(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
