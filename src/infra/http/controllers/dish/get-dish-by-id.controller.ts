import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetDishByIdUseCase } from '@/domain/smart-menu/application/use-cases/dish/get-dish-by-id'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { DishPresenter } from '../../presenters/dish-presenter'
import { Public } from '@/infra/auth/public'

@Controller('dishes/:dishId')
export class GetDishByIdController {
  constructor(private getDishByIdUseCase: GetDishByIdUseCase) {}

  @Get()
  @Public()
  async handle(@Param('dishId', ParseUUIDPipe) dishId: string) {
    const result = await this.getDishByIdUseCase.execute({
      dishId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const dish = result.value.dish

    return {
      dish: DishPresenter.toHTTP(dish),
    }
  }
}
