import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'
import { Prisma, Order as PrismaOrder } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        tableNumber: raw.tableNumber,
        observations: raw.observations,
        status: raw.status,
        costumerId: raw.costumerId
          ? new UniqueEntityId(raw.costumerId)
          : undefined,
        restaurantId: new UniqueEntityId(raw.restaurantId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      restaurantId: order.restaurantId.toString(),
      costumerId: order.costumerId?.toString(),
      createdAt: order.createdAt,
      observations: order.observations,
      status: order.status,
      tableNumber: order.tableNumber,
    }
  }
}
