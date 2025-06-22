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
import { ListRestaurantsWithAddressController } from './list-restaurants-with-address.controller'
import { GetRestaurantByIdWithAddressController } from './get-restaurant-by-id-with-address.controller'
import { ListRestaurantsWithAddressUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/list-restaurants-with-address'
import { GetRestaurantByIdWithAddressUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/get-restaurant-by-id-with-address'
import { FindRestaurantsByProximityController } from './find-restaurants-by-proximity.controller'
import { FindRestaurantsByProximityUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/find-restaurants-by-proximity'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateRestaurantController,
    ListRestaurantsController,
    GetRestaurantByIdController,
    EditRestaurantController,
    DeleteRestaurantController,
    ListRestaurantsWithAddressController,
    GetRestaurantByIdWithAddressController,
    FindRestaurantsByProximityController,
  ],
  providers: [
    CreateRestaurantUseCase,
    ListRestaurantsUseCase,
    GetRestaurantByIdUseCase,
    EditRestaurantUseCase,
    DeleteRestaurantUseCase,
    ListRestaurantsWithAddressUseCase,
    GetRestaurantByIdWithAddressUseCase,
    FindRestaurantsByProximityUseCase,
  ],
})
export class RestaurantModule {}
