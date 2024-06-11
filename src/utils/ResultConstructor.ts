import { CustomErrorStatus } from '@/constant/constant';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
export class ResultConstructor {
  public static Send<T = any>(
    res: Response,
    httpCode: number,
    data?: T,
    errorMsg?: string,
    code: number = httpCode,
  ) {
    res.status(httpCode).send({
      code,
      message: errorMsg,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  // 500错误返回
  public static Error<T = any>(res: Response, errorMsg: string, data?: T) {
    return ResultConstructor.Send(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      data,
      errorMsg,
    );
  }

  // 200返回的错误
  public static RejectRequest(res: Response, errorMsg: string) {
    return ResultConstructor.Send(
      res,
      HttpStatus.OK,
      null,
      errorMsg,
      CustomErrorStatus.REJECT_REQUEST,
    );
  }

  public static RequestNotFound(res: Response, errorMsg: string) {
    return ResultConstructor.Send(res, HttpStatus.NOT_FOUND, null, errorMsg);
  }

  public static Success<T = any>(
    res: Response,
    data?: T,
    code: number = HttpStatus.OK,
  ) {
    return ResultConstructor.Send(res, HttpStatus.OK, data, null, code);
  }

  public static Unauthorized(res: Response, errorMsg: string) {
    return ResultConstructor.Send(res, HttpStatus.UNAUTHORIZED, null, errorMsg);
  }
}
