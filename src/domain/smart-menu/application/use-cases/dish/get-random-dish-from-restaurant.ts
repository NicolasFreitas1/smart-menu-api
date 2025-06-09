import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'

interface GetRandomDishFromRestaurantUseCaseRequest {
  restaurantId: string
  category: string
}

type GetRandomDishFromRestaurantUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dish: Dish
  }
>

@Injectable()
export class GetRandomDishFromRestaurantUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    restaurantId,
    category,
  }: GetRandomDishFromRestaurantUseCaseRequest): Promise<GetRandomDishFromRestaurantUseCaseResponse> {
    const dish =
      await this.dishesRepository.findRandomByByRestaurantAndCategory(
        restaurantId,
        category,
      )

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    return right({ dish })
  }
}
