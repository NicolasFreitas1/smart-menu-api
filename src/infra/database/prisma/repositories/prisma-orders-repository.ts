import { OrdersRepository } from '@/domain/smart-menu/application/repositories/orders-repository'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Order>> {
    const orders = await this.prisma.order.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.order.count()

    return {
      data: orders.map(PrismaOrderMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.create({
      data,
    })
  }

  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.update({
      where: {
        id: order.id.toString(),
      },
      data,
    })
  }

  async delete(order: Order): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id: order.id.toString(),
      },
    })
  }

  async findManyByRestaurant(
    { page, perPage }: PaginationParams,
    restaurantId: string,
  ): Promise<DataWithPagination<Order>> {
    const orders = await this.prisma.order.findMany({
      where: {
        restaurantId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.order.count({
      where: {
        restaurantId,
      },
    })

    return {
      data: orders.map(PrismaOrderMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }
}
