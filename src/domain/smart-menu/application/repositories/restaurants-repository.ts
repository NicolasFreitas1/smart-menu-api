import { PaginationParams } from '@/core/repositories/pagination-params'
import { Restaurant } from '../../enterprise/entities/restaurant'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { RestaurantWithAddress } from '../../enterprise/entities/value-objects/restaurant-with-address'

export abstract class RestaurantsRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<Restaurant>>

  abstract findManyWithAddress(
    params: PaginationParams,
  ): Promise<DataWithPagination<RestaurantWithAddress>>

  abstract findById(id: string): Promise<Restaurant | null>

  abstract findByIdWithAddress(
    id: string,
  ): Promise<RestaurantWithAddress | null>

  abstract create(restaurant: Restaurant): Promise<void>
  abstract save(restaurant: Restaurant): Promise<void>
  abstract delete(restaurant: Restaurant): Promise<void>
}
