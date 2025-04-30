import { Module } from '@nestjs/common'
import { RestaurantModule } from './controllers/restaurant/restaurant.module'
import { UserModule } from './controllers/user/user.module'

@Module({
  imports: [RestaurantModule, UserModule],
})
export class HttpModule {}
