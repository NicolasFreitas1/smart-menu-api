import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderItem } from '../../enterprise/entities/order-item'

export abstract class OrderItemRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<OrderItem>>

  abstract findManyByRestaurant(
    params: PaginationParams,
    restaurantId: string,
  ): Promise<DataWithPagination<OrderItem>>

  abstract findById(id: string): Promise<OrderItem | null>
  abstract create(order: OrderItem): Promise<void>
  abstract save(order: OrderItem): Promise<void>
  abstract delete(order: OrderItem): Promise<void>
}
