import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'

interface EditRestaurantUseCaseRequest {
  restaurantId: string
  name: string
}

type EditRestaurantUseCaseResponse = Either<
  ResourceNotFoundError | EmailAlreadyInUseError,
  {
    restaurant: Restaurant
  }
>

@Injectable()
export class EditRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    name,
    restaurantId,
  }: EditRestaurantUseCaseRequest): Promise<EditRestaurantUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    restaurant.name = name

    await this.restaurantsRepository.save(restaurant)

    return right({ restaurant })
  }
}
