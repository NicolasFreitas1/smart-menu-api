import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteRestaurantUseCaseRequest {
  restaurantId: string
}

type DeleteRestaurantUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    restaurantId,
  }: DeleteRestaurantUseCaseRequest): Promise<DeleteRestaurantUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    await this.restaurantsRepository.delete(restaurant)

    return right(null)
  }
}
