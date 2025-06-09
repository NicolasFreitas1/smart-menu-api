import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DishesRepository } from '@/domain/smart-menu/application/repositories/dishes-repository'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'
import { Injectable } from '@nestjs/common'
import { PrismaDishMapper } from '../mappers/prisma-dish-mapper'
import { PrismaService } from '../prisma.service'
import { DishWithCategories } from '@/domain/smart-menu/enterprise/entities/value-objects/dish-with-categories'
import { PrismaDishWithCategoriesMapper } from '../mappers/prisma-dish-with-categories-mapper'
import { Prisma } from '@prisma/client'

@Injectable()
export class PrismaDishesRepository implements DishesRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Dish>> {
    const dishes = await this.prisma.dish.findMany({
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

  async findRandomByByRestaurantAndCategory(
    restaurantId: string,
    category: string,
  ): Promise<Dish | null> {
    const dishes = await this.prisma.dish.findMany({
      where: {
        restaurantId,
        categories: {
          some: { category: { name: category } },
        },
      },
    })
    console.log('🚀 ~ PrismaDishesRepository ~ dishes:', dishes)

    if (dishes.length === 0) return null

    const randomIndex = Math.floor(Math.random() * dishes.length)
    const randomDish = dishes[randomIndex]

    return PrismaDishMapper.toDomain(randomDish)
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
    categoryFilter?: string,
  ): Promise<DataWithPagination<Dish>> {
    const dishes = await this.prisma.dish.findMany({
      where: {
        restaurantId,
        categories: {
          some: { category: { name: categoryFilter } },
        },
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

  async findManyByRestaurantWithCategories(
    { page, perPage }: PaginationParams,
    restaurantId: string,
    categoryFilter?: string,
  ): Promise<DataWithPagination<DishWithCategories>> {
    const where: Prisma.DishWhereInput = {
      restaurantId,
      ...(categoryFilter && {
        categories: {
          some: {
            category: {
              name: categoryFilter,
            },
          },
        },
      }),
    }

    const dishes = await this.prisma.dish.findMany({
      where,
      include: {
        categories: {
          include: { category: true },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.dish.count({
      where,
    })

    return {
      data: dishes.map(PrismaDishWithCategoriesMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }
}
