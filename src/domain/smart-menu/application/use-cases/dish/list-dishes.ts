import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'

interface ListDishesUseCaseRequest {
  page: number
  perPage: number
}

type ListDishesUseCaseResponse = Either<
  null,
  {
    dishes: DataWithPagination<Dish>
  }
>

@Injectable()
export class ListDishesUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    page,
    perPage,
  }: ListDishesUseCaseRequest): Promise<ListDishesUseCaseResponse> {
    const dishes = await this.dishesRepository.findMany({
      page,
      perPage,
    })

    return right({ dishes })
  }
}
