import { PaginationParams } from '@/core/repositories/pagination-params'
import { DishCategory } from '../../enterprise/entities/dish-category'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'

export abstract class DishCategoriesRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<DishCategory>>

  abstract findManyWithoutPagination(): Promise<DishCategory[]>

  abstract findById(id: string): Promise<DishCategory | null>
  abstract create(dishCategory: DishCategory): Promise<void>
  abstract createMany(dishCategories: DishCategory[]): Promise<void>
  abstract save(dishCategory: DishCategory): Promise<void>
  abstract delete(dishCategory: DishCategory): Promise<void>
}
