import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DishesRepository } from '@/domain/smart-menu/application/repositories/dishes-repository'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'
import { Injectable } from '@nestjs/common'
import { PrismaDishMapper } from '../mappers/prisma-dish-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDishesRepository implements DishesRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Dish>> {
    const dishes = await this.prisma.
    
    
    .findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.dish.count()

    return {
      data: dishes.map(PrismaDishMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findById(id: string): Promise<Dish | null> {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    })

    if (!dish) {
      return null
    }

    return PrismaDishMapper.toDomain(dish)
  }

  async create(dish: Dish): Promise<void> {
    const data = PrismaDishMapper.toPrisma(dish)

    await this.prisma.dish.create({
      data,
    })
  }

  async save(dish: Dish): Promise<void> {
    const data = PrismaDishMapper.toPrisma(dish)

    await this.prisma.dish.update({
      where: {
        id: dish.id.toString(),
      },
      data,
    })
  }

  async delete(dish: Dish): Promise<void> {
    await this.prisma.dish.delete({
      where: {
        id: dish.id.toString(),
      },
    })
  }

  async findManyByRestaurant(
    { page, perPage }: PaginationParams,
    restaurantId: string,
  ): Promise<DataWithPagination<Dish>> {
    const dishes = await this.prisma.dish.findMany({
      where: {
        restaurantId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
  
    const total = await this.prisma.dish.count({
      where: {
        restaurantId,
      },
    })
  
    return {
      data: dishes.map(PrismaDishMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }
  
}
