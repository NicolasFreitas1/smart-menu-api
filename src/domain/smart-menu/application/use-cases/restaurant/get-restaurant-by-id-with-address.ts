import { Either, left, right } from '@/core/either'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { RestaurantWithAddress } from '../../../enterprise/entities/value-objects/restaurant-with-address'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface GetRestaurantByIdWithAddressUseCaseRequest {
  id: string
}

type GetRestaurantByIdWithAddressUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    restaurant: RestaurantWithAddress
  }
>

export class GetRestaurantByIdWithAddressUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    id,
  }: GetRestaurantByIdWithAddressUseCaseRequest): Promise<GetRestaurantByIdWithAddressUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findByIdWithAddress(id)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    return right({ restaurant })
  }
}
