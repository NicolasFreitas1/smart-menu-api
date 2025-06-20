import { Module } from '@nestjs/common';
import { GetApiHealthController } from './health.controller';

@Module({
  controllers: [GetApiHealthController],
})
export class HealthModule {}
