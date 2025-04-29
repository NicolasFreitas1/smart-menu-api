import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'

interface ListDishesByRestaurantUseCaseRequest {
  restaurantId: string
  page: number
  perPage: number
}

type ListDishesByRestaurantUseCaseResponse = Either<
  null,
  {
    dishes: DataWithPagination<Dish>
  }
>

@Injectable()
export class ListDishesByRestaurantUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    page,
    perPage,
    restaurantId,
  }: ListDishesByRestaurantUseCaseRequest): Promise<ListDishesByRestaurantUseCaseResponse> {
    const dishes = await this.dishesRepository.findManyByRestaurant(
      {
        page,
        perPage,
      },
      restaurantId,
    )

    return right({ dishes })
  }
}
