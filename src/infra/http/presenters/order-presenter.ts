import { Order } from '@/domain/smart-menu/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      tableNumber: order.tableNumber,
      observations: order.observations,
      restaurantId: order.restaurantId.toString(),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
