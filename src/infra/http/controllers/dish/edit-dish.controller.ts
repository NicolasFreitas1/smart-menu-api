import { EditDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/edit-dish'
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
import { EditDishBodySchema, bodyValidationPipe } from './dtos/edit-dish.dto'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EmailAlreadyInUseError } from '@/domain/smart-menu/application/use-cases/__errors/email-already-in-use-error'

@Controller('dishes/:dishId')
export class EditDishController {
  constructor(private editDishUseCase: EditDishUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('dishId', ParseUUIDPipe) dishId: string,
    @Body(bodyValidationPipe) body: EditDishBodySchema,
  ) {
    const { name, description, price, categories } = body

    const result = await this.editDishUseCase.execute({
      description,
      dishId,
      name,
      price,
      categories,
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
