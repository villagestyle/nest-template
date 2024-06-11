import { AuthKey } from '@/constant/constant';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request>();

    const headers = request.headers;
    const token = headers[AuthKey.toLowerCase()] as string;

    if (!token) {
      throw new HttpException('need auth', HttpStatus.UNAUTHORIZED);
    }

    try {
      // 调用自定义的校验方法并存储用户信息
      // const data = await checkTokenFn(token);

      // if (!data) {
      //   throw new HttpException('need auth', HttpStatus.UNAUTHORIZED);
      // }

      return Promise.resolve(true);
    } catch (_) {
      throw new HttpException('need auth', HttpStatus.UNAUTHORIZED);
    }
  }
}
