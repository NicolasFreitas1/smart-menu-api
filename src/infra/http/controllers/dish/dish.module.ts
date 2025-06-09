import { Module } from '@nestjs/common'
import { CreateDishController } from './create-dish.controller'
import { DeleteDishController } from './delete-dish.controller'
import { EditDishController } from './edit-dish.controller'
import { GetDishByIdController } from './get-dish-by-id.controller'
import { ListDishesController } from './list-dishes.controller'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { CreateDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/create-dish'
import { DeleteDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/delete-dish'
import { EditDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/edit-dish'
import { GetDishByIdUseCase } from '@/domain/smart-menu/application/use-cases/dish/get-dish-by-id'
import { ListDishesUseCase } from '@/domain/smart-menu/application/use-cases/dish/list-dishes'
import { ListDishesByRestaurantController } from './list-dishes-by-restaurant.controller'
import { ListDishesByRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/dish/list-dishes-by-restaurant'
import { GetRandomDishFromRestaurantController } from './get-random-dish-from-restaurant.controller'
import { GetRandomDishFromRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/dish/get-random-dish-from-restaurant'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateDishController,
    DeleteDishController,
    EditDishController,
    GetDishByIdController,
    ListDishesController,
    ListDishesByRestaurantController,
    GetRandomDishFromRestaurantController,
  ],
  providers: [
    CreateDishUseCase,
    DeleteDishUseCase,
    EditDishUseCase,
    GetDishByIdUseCase,
    ListDishesUseCase,
    ListDishesByRestaurantUseCase,
    GetRandomDishFromRestaurantUseCase,
  ],
})
export class DishModule {}
