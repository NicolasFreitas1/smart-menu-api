import { Body, Controller, Param, Put } from '@nestjs/common'
import { EditDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/edit-dish'
import { EditDishDto } from './dtos/edit-dish.dto'

@Controller('dishes')
export class EditDishController {
  constructor(private editDishUseCase: EditDishUseCase) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() body: EditDishDto) {
    await this.editDishUseCase.execute({
      dishId: id,
      ...body,
    })
  }
}
