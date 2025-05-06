import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { OrderItem } from '@/domain/smart-menu/enterprise/entities/order-item'
import { Prisma, OrderItem as PrismaOrderItem } from '@prisma/client'

export class PrismaOrderItemMapper {
  static toDomain(raw: PrismaOrderItem): OrderItem {
    return OrderItem.create(
      {
        dishId: new UniqueEntityId(raw.dishId),
        orderId: new UniqueEntityId(raw.orderId),
        quantity: raw.quantity,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(orderItem: OrderItem): Prisma.OrderItemUncheckedCreateInput {
    return {
      id: orderItem.id.toString(),
      dishId: orderItem.dishId.toString(),
      orderId: orderItem.orderId.toString(),
      quantity: orderItem.quantity,
      createdAt: orderItem.createdAt,
      updatedAt: orderItem.updatedAt
        ? new Date(orderItem.updatedAt)
        : undefined,
    }
  }
}
