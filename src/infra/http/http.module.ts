import { Module } from '@nestjs/common'
import { RestaurantModule } from './controllers/restaurant/restaurant.module'
import { UserModule } from './controllers/user/user.module'
import { DishModule } from './controllers/dish/dish.module'
import { OrderModule } from './controllers/order/order.module'

@Module({
  imports: [RestaurantModule, UserModule, DishModule, OrderModule],
})
export class HttpModule {}
