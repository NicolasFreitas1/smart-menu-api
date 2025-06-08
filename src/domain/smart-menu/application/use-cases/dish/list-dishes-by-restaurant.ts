import { Either, right } from '@/core/either'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { DishWithCategories } from '@/domain/smart-menu/enterprise/entities/value-objects/dish-with-categories'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'

interface ListDishesByRestaurantUseCaseRequest {
  restaurantId: string
  page: number
  perPage: number
  categoryFilter?: string
}

type ListDishesByRestaurantUseCaseResponse = Either<
  null,
  {
    dishes: DataWithPagination<DishWithCategories>
  }
>

@Injectable()
export class ListDishesByRestaurantUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    page,
    perPage,
    restaurantId,
    categoryFilter,
  }: ListDishesByRestaurantUseCaseRequest): Promise<ListDishesByRestaurantUseCaseResponse> {
    const dishes =
      await this.dishesRepository.findManyByRestaurantWithCategories(
        {
          page,
          perPage,
        },
        restaurantId,
        categoryFilter,
      )

    return right({ dishes })
  }
}
