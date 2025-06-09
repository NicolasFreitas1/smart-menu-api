import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Dish } from '../../enterprise/entities/dish'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DishWithCategories } from '../../enterprise/entities/value-objects/dish-with-categories'

export abstract class DishesRepository {
  abstract findMany(params: PaginationParams): Promise<DataWithPagination<Dish>>
  abstract findManyByRestaurant(
    params: PaginationParams,
    restaurantId: string,
    categoryFilter?: string,
  ): Promise<DataWithPagination<Dish>>

  abstract findManyByRestaurantWithCategories(
    params: PaginationParams,
    restaurantId: string,
    categoryFilter?: string,
  ): Promise<DataWithPagination<DishWithCategories>>

  abstract findById(id: string): Promise<Dish | null>
  abstract findRandomByByRestaurantAndCategory(
    restaurantId: string,
    category: string,
  ): Promise<Dish | null>

  abstract create(dish: Dish): Promise<void>
  abstract save(dish: Dish): Promise<void>
  abstract delete(dish: Dish): Promise<void>
}
