import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetRestaurantByIdUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/get-restaurant-by-id'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { RestaurantPresenter } from '../../presenters/restaurant-presenter'
import { Public } from '@/infra/auth/public'

@Controller('restaurants/:restaurantId')
export class GetRestaurantByIdController {
  constructor(private getRestaurantByIdUseCase: GetRestaurantByIdUseCase) {}

  @Get()
  @Public()
  async handle(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
    const result = await this.getRestaurantByIdUseCase.execute({
      restaurantId,
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

    const restaurant = result.value.restaurant

    return {
      restaurant: RestaurantPresenter.toHTTP(restaurant),
    }
  }
}
