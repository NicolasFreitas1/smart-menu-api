import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteDishUseCaseRequest {
  dishId: string
}

type DeleteDishUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteDishUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    dishId,
  }: DeleteDishUseCaseRequest): Promise<DeleteDishUseCaseResponse> {
    const dish = await this.dishesRepository.findById(dishId)

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    await this.dishesRepository.delete(dish)

    return right(null)
  }
}
