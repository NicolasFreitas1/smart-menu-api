import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderItem } from '../../enterprise/entities/order-item'

export abstract class OrderItensRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<OrderItem>>

  abstract findById(id: string): Promise<OrderItem | null>
  abstract create(orderItem: OrderItem): Promise<void>
  abstract createMany(orderItens: OrderItem[]): Promise<void>
  abstract save(order: OrderItem): Promise<void>
  abstract delete(order: OrderItem): Promise<void>
}
