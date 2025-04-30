import { EditRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/edit-restaurant'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import {
  EditRestaurantBodySchema,
  bodyValidationPipe,
} from './dtos/edit-restaurant.dto'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EmailAlreadyInUseError } from '@/domain/smart-menu/application/use-cases/__errors/email-already-in-use-error'

@Controller('restaurants/:restaurantId')
export class EditRestaurantController {
  constructor(private editRestaurantUseCase: EditRestaurantUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body(bodyValidationPipe) body: EditRestaurantBodySchema,
  ) {
    const { name } = body

    const result = await this.editRestaurantUseCase.execute({
      restaurantId,
      name,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case EmailAlreadyInUseError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
