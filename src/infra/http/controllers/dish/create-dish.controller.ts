import { Body, Controller, Post } from '@nestjs/common'
import { CreateDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/create-dish'
import { CreateDishDto } from './dtos/create-dish.dto'

@Controller('dishes')
export class CreateDishController {
  constructor(private createDishUseCase: CreateDishUseCase) {}

  @Post()
  async handle(@Body() body: CreateDishDto) {
    const { name, price, restaurantId, description } = body

    await this.createDishUseCase.execute({
      name,
      price,
      restaurantId,
      description,
    })
  }
}
