import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/delete-restaurant'
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

@Controller('/restaurants/:restaurantId')
export class DeleteRestaurantController {
  constructor(private deleteRestaurantUseCase: DeleteRestaurantUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
    const result = await this.deleteRestaurantUseCase.execute({
      restaurantId,
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
