import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'

export abstract class OrdersRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<Order>>

  abstract findManyByRestaurant(
    params: PaginationParams,
    restaurantId: string,
  ): Promise<DataWithPagination<Order>>

  abstract findById(id: string): Promise<Order | null>
  abstract create(order: Order): Promise<void>
  abstract save(order: Order): Promise<void>
  abstract delete(order: Order): Promise<void>
}
