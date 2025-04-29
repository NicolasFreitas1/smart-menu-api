import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'

interface CreateDishUseCaseRequest {
  name: string
  description: string
  price: number
  restaurantId: string
}

type CreateDishUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dish: Dish
  }
>

@Injectable()
export class CreateDishUseCase {
  constructor(
    private dishesRepository: DishesRepository,
    private restaurantsRepository: RestaurantsRepository,
  ) {}

  async execute({
    description,
    name,
    price,
    restaurantId,
  }: CreateDishUseCaseRequest): Promise<CreateDishUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    const dish = Dish.create({
      description,
      name,
      price,
      restaurantId: restaurant.id,
    })

    await this.dishesRepository.create(dish)

    return right({
      dish,
    })
  }
}
