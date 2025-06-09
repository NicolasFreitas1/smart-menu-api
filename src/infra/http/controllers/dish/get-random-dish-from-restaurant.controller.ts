import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { DishPresenter } from '../../presenters/dish-presenter'
import { Public } from '@/infra/auth/public'
import { GetRandomDishFromRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/dish/get-random-dish-from-restaurant'

@Controller('dishes/random/:restaurantId')
export class GetRandomDishFromRestaurantController {
  constructor(
    private getRandomDishFromRestaurantUseCase: GetRandomDishFromRestaurantUseCase,
  ) {}

  @Get()
  @Public()
  async handle(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Query('category') category: string,
  ) {
    const result = await this.getRandomDishFromRestaurantUseCase.execute({
      restaurantId,
      category,
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
