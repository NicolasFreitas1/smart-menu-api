import { Module } from '@nestjs/common'
import { RestaurantModule } from './controllers/restaurant/restaurant.module'
import { UserModule } from './controllers/user/user.module'
import { DishModule } from './controllers/dish/dish.module'

@Module({
  imports: [RestaurantModule, UserModule, DishModule],
})
export class HttpModule {}
