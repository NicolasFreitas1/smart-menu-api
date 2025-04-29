import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'

interface GetDishByIdUseCaseRequest {
  dishId: string
}

type GetDishByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dish: Dish
  }
>

@Injectable()
export class GetDishByIdUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    dishId,
  }: GetDishByIdUseCaseRequest): Promise<GetDishByIdUseCaseResponse> {
    const dish = await this.dishesRepository.findById(dishId)

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    return right({ dish })
  }
}
