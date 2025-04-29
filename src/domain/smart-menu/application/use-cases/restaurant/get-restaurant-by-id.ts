import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'

interface GetRestaurantByIdUseCaseRequest {
  restaurantId: string
}

type GetRestaurantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    restaurant: Restaurant
  }
>

@Injectable()
export class GetRestaurantByIdUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    restaurantId,
  }: GetRestaurantByIdUseCaseRequest): Promise<GetRestaurantByIdUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    return right({ restaurant })
  }
}
