import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'
import { OrderPresenter } from './order-presenter'

export class OrderWithPaginationPresenter {
  static toHTTP(order: DataWithPagination<Order>) {
    return {
      orders: order.data.map(OrderPresenter.toHTTP),
      amount: order.amount,
      totalPages: order.totalPages,
      actualPage: order.actualPage,
      perPage: order.perPage,
    }
  }
}
