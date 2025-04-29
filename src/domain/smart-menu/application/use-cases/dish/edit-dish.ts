import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'

interface EditDishUseCaseRequest {
  dishId: string
  name: string
  description: string
  price: number
}

type EditDishUseCaseResponse = Either<
  ResourceNotFoundError | EmailAlreadyInUseError,
  {
    dish: Dish
  }
>

@Injectable()
export class EditDishUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    name,
    dishId,
    description,
    price,
  }: EditDishUseCaseRequest): Promise<EditDishUseCaseResponse> {
    const dish = await this.dishesRepository.findById(dishId)

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    dish.name = name
    dish.description = description
    dish.price = price

    await this.dishesRepository.save(dish)

    return right({ dish })
  }
}
