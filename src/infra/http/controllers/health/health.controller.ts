import { Public } from '@/infra/auth/public';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class GetApiHealthController {
  @Get()
  @Public()
  async handle() {
    return 'OK';
  }
}
