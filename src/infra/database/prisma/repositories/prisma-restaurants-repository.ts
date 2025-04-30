import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { RestaurantsRepository } from '@/domain/smart-menu/application/repositories/restaurants-repository'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'
import { Injectable } from '@nestjs/common'
import { PrismaRestaurantMapper } from '../mappers/prisma-restaurant-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaRestaurantsRepository implements RestaurantsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Restaurant>> {
    const restaurants = await this.prisma.restaurant.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.restaurant.count()

    return {
      data: restaurants.map(PrismaRestaurantMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    })

    if (!restaurant) {
      return null
    }

    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async create(restaurant: Restaurant): Promise<void> {
    const data = PrismaRestaurantMapper.toPrisma(restaurant)

    await this.prisma.restaurant.create({
      data,
    })
  }

  async save(restaurant: Restaurant): Promise<void> {
    const data = PrismaRestaurantMapper.toPrisma(restaurant)

    await this.prisma.restaurant.update({
      where: {
        id: restaurant.id.toString(),
      },
      data,
    })
  }

  async delete(restaurant: Restaurant): Promise<void> {
    await this.prisma.restaurant.delete({
      where: {
        id: restaurant.id.toString(),
      },
    })
  }
}
