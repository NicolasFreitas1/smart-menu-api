import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Dish } from '../../enterprise/entities/dish'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class DishesRepository {
  abstract findMany(params: PaginationParams): Promise<DataWithPagination<Dish>>
  abstract findManyByRestaurant(
    params: PaginationParams,
    restaurantId: string,
  ): Promise<DataWithPagination<Dish>>

  abstract findById(id: string): Promise<Dish | null>
  abstract create(dish: Dish): Promise<void>
  abstract save(dish: Dish): Promise<void>
  abstract delete(dish: Dish): Promise<void>
}
