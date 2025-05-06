import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/delete-dish'
import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'

@Controller('/dishes/:dishId')
export class DeleteDishController {
  constructor(private deleteDishUseCase: DeleteDishUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('dishId', ParseUUIDPipe) dishId: string) {
    const result = await this.deleteDishUseCase.execute({
      dishId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case NotAllowedError:
          throw new ForbiddenException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
