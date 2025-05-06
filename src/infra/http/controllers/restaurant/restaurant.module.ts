import { CreateRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/create-restaurant'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateRestaurantController } from './create-restaurant.controller'
import { DeleteRestaurantController } from './delete-restaurant.controller'
import { EditRestaurantController } from './edit-restaurant.controller'
import { GetRestaurantByIdController } from './get-restaurant-by-id.controller'
import { ListRestaurantsController } from './list-restaurants.controller'
import { ListRestaurantsUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/list-restaurants'
import { GetRestaurantByIdUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/get-restaurant-by-id'
import { EditRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/edit-restaurant'
import { DeleteRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/delete-restaurant'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateRestaurantController,
    ListRestaurantsController,
    GetRestaurantByIdController,
    EditRestaurantController,
    DeleteRestaurantController,
  ],
  providers: [
    CreateRestaurantUseCase,
    ListRestaurantsUseCase,
    GetRestaurantByIdUseCase,
    EditRestaurantUseCase,
    DeleteRestaurantUseCase,
  ],
})
export class RestaurantModule {}
