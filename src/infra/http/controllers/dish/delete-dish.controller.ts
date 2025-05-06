import { Controller, Delete, Param } from '@nestjs/common'
import { DeleteDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/delete-dish'

@Controller('dishes')
export class DeleteDishController {
  constructor(private deleteDishUseCase: DeleteDishUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deleteDishUseCase.execute({ dishId: id })
  }
}

