import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SponsorDto {
  id: number;

  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @ApiProperty({ description: '头像', required: false })
  avatar: string;

  @ApiProperty({ description: '描述', required: false })
  @MaxLength(200, { message: '描述不能超过200个字符' })
  description: string;
}
