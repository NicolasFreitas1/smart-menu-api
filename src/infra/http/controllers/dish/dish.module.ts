import { Module } from '@nestjs/common'
import { CreateDishController } from './create-dish.controller'
import { DeleteDishController } from './delete-dish.controller'
import { EditDishController } from './edit-dish.controller'
import { GetDishByIdController } from './get-dish-by-id.controller'
import { ListDishesController } from './list-dishes.controller'

@Module({
  controllers: [
    CreateDishController,
    DeleteDishController,
    EditDishController,
    GetDishByIdController,
    ListDishesController,
  ],
})
export class DishModule {}
