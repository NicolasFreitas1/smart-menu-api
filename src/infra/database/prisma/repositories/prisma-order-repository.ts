import { PrismaService } from "./prisma.service";
import { OrderRepository } from "../../../domain/smart-menu/repositories/order-repository";
import { Order } from "../../../domain/smart-menu/enterprise/entities/order";
import { OrderItem } from "../../../domain/smart-menu/enterprise/entities/order-item";
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order, items: OrderItem[]): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order, items);
    await this.prisma.order.create({ data });
  }

  async updateStatus(orderId: string, status: string): Promise<void> {
    await this.prisma.order.update({
      where: { id_order: orderId },
      data: { vl_status: status },
    });
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id_order: orderId },
      include: { itens: { include: { dish: true } } },
    });
    return order ? PrismaOrderMapper.toDomain(order) : null;
  }

  async listByRestaurant(restaurantId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { id_restaurant: restaurantId },
      include: { itens: { include: { dish: true } } },
    });
    return orders.map(PrismaOrderMapper.toDomain);
  }

  async listByCustomer(customerId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { id_costumer: customerId },
      include: { itens: { include: { dish: true } } },
    });
    return orders.map(PrismaOrderMapper.toDomain);
  }
}