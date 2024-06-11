import { CustomErrorStatus } from '@/constant/constant';
import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype) || !value) {
      return value;
    }
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // 嵌套dto的错误信息
      let validationError = errors[0];

      while (!validationError.constraints) {
        validationError = validationError.children[0];
      }

      const message = Object.values(validationError.constraints)[0];
      throw new HttpException(message, CustomErrorStatus.WRONG_PARAMETERS);
    }
    return value;
  }

  private toValidate(metaType: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }
}
