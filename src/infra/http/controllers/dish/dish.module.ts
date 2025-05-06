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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateDishController,
    DeleteDishController,
    EditDishController,
    GetDishByIdController,
    ListDishesController,
  ],
  providers: [
    CreateDishUseCase,
    DeleteDishUseCase,
    EditDishUseCase,
    GetDishByIdUseCase,
    ListDishesUseCase,
  ],
})
export class DishModule {}
