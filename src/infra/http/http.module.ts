import { Module } from '@nestjs/common';
import { RestaurantModule } from './controllers/restaurant/restaurant.module';
import { UserModule } from './controllers/user/user.module';
import { DishModule } from './controllers/dish/dish.module';
import { OrderModule } from './controllers/order/order.module';
import { CategoryModule } from './controllers/category/category.module';
import { SuggestionModule } from './controllers/suggestion/suggestion.module';
import { HealthModule } from './controllers/health/health.module';

@Module({
  imports: [
    RestaurantModule,
    UserModule,
    DishModule,
    OrderModule,
    CategoryModule,
    SuggestionModule,
    HealthModule,
  ],
})
export class HttpModule {}
