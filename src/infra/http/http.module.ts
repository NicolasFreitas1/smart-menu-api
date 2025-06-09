import { Module } from '@nestjs/common'
import { RestaurantModule } from './controllers/restaurant/restaurant.module'
import { UserModule } from './controllers/user/user.module'
import { DishModule } from './controllers/dish/dish.module'
import { OrderModule } from './controllers/order/order.module'
import { CategoryModule } from './controllers/category/category.module'

@Module({
  imports: [
    RestaurantModule,
    UserModule,
    DishModule,
    OrderModule,
    CategoryModule,
  ],
})
export class HttpModule {}
