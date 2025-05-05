import { Controller, Get, Param } from '@nestjs/common'
import { GetDishByIdUseCase } from '@/domain/smart-menu/application/use-cases/dish/get-dish-by-id'

@Controller('dishes')
export class GetDishByIdController {
  constructor(private getDishByIdUseCase: GetDishByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    return await this.getDishByIdUseCase.execute({ dishId: id })
  }
}

