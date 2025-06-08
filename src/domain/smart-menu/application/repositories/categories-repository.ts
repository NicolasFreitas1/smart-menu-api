import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Category } from '../../enterprise/entities/category'

export abstract class CategoriesRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<Category>>

  abstract findManyWithoutPagination(): Promise<Category[]>

  abstract findById(id: string): Promise<Category | null>
  abstract create(category: Category): Promise<void>
  abstract save(category: Category): Promise<void>
  abstract delete(category: Category): Promise<void>
}
