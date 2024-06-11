import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ExampleSchedule implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    // 初始调用
    this.handleCron();
  }

  // 定时调用
  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    console.log('ExampleSchedule Every Hour');
  }
}
