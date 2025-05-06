import { Order } from "../../domain/smart-menu/enterprise/entities/order";
import { OrderItem } from "../../domain/smart-menu/enterprise/entities/order-item";
import { Prisma, Order as PrismaOrder, OrderItem as PrismaOrderItem } from "@prisma/client";

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder & { itens: PrismaOrderItem[] }): Order {
    return Order.create({
      id: raw.id_order,
      tableNumber: raw.vl_table_number,
      observations: raw.ds_observations,
      status: raw.vl_status,
      customerId: raw.id_costumer,
      restaurantId: raw.id_restaurant,
      createdAt: raw.dt_created,
      updatedAt: raw.dt_updated,
    });
  }

  static toPrisma(order: Order, items: OrderItem[]): Prisma.OrderCreateInput {
    return {
      id_order: order.id.toString(),
      vl_table_number: order.tableNumber,
      ds_observations: order.observations,
      vl_status: order.status,
      dt_created: order.createdAt,
      dt_updated: order.updatedAt,
      costumer: order.customerId ? { connect: { id_costumer: order.customerId } } : undefined,
      restaurant: { connect: { id_restaurant: order.restaurantId } },
      itens: {
        create: items.map((item) => ({
          id_order_item: item.id.toString(),
          vl_quantity: item.quantity,
          dish: { connect: { id_dish: item.dishId.toString() } },
        })),
      },
    };
  }
}