import { CustomErrorStatus } from '@/constant/constant';
import { ResultConstructor } from '@/utils/ResultConstructor';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// 捕获所有的HttpException异常
@Catch(HttpException)
export class HttpExceptionFilterFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;

    if (
      status === CustomErrorStatus.WRONG_PARAMETERS ||
      status === CustomErrorStatus.REJECT_REQUEST
    ) {
      ResultConstructor.RejectRequest(response, message);
    } else if (status === HttpStatus.UNAUTHORIZED) {
      ResultConstructor.Unauthorized(response, message);
    } else {
      ResultConstructor.Error(response, exception.message, exception);
    }
  }
}
