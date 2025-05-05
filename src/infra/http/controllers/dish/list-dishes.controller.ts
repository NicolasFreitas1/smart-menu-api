import { Controller, Get, Query } from '@nestjs/common'
import { ListDishesUseCase } from '@/domain/smart-menu/application/use-cases/dish/list-dishes'

@Controller('dishes')
export class ListDishesController {
  constructor(private listDishesUseCase: ListDishesUseCase) {}

  @Get()
  async handle(@Query('page') page = 1, @Query('perPage') perPage = 10) {
    return await this.listDishesUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
    })
  }
}
