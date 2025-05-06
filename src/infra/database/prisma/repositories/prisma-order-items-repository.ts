import { PrismaOrderItemMapper } from '../mappers/prisma-order-item-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { OrderItem } from '@/domain/smart-menu/enterprise/entities/order-item'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderItensRepository } from '@/domain/smart-menu/application/repositories/order-itens-repository'

@Injectable()
export class PrismaOrderItensRepository implements OrderItensRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<OrderItem>> {
    const orderItens = await this.prisma.orderItem.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.orderItem.count()

    return {
      data: orderItens.map(PrismaOrderItemMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        id,
      },
    })

    if (!orderItem) {
      return null
    }

    return PrismaOrderItemMapper.toDomain(orderItem)
  }

  async create(orderItem: OrderItem): Promise<void> {
    const data = PrismaOrderItemMapper.toPrisma(orderItem)

    await this.prisma.orderItem.create({
      data,
    })
  }

  async createMany(orderItens: OrderItem[]): Promise<void> {
    const data = orderItens.map(PrismaOrderItemMapper.toPrisma)

    await this.prisma.orderItem.createMany({
      data,
    })
  }

  async save(orderItem: OrderItem): Promise<void> {
    const data = PrismaOrderItemMapper.toPrisma(orderItem)

    await this.prisma.orderItem.update({
      where: {
        id: orderItem.id.toString(),
      },
      data,
    })
  }

  async delete(orderItem: OrderItem): Promise<void> {
    await this.prisma.orderItem.delete({
      where: {
        id: orderItem.id.toString(),
      },
    })
  }
}
