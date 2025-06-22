import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  RestaurantsRepository,
  ProximityParams,
} from '@/domain/smart-menu/application/repositories/restaurants-repository'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'
import { RestaurantWithAddress } from '@/domain/smart-menu/enterprise/entities/value-objects/restaurant-with-address'
import { Injectable } from '@nestjs/common'
import { PrismaRestaurantMapper } from '../mappers/prisma-restaurant-mapper'
import { PrismaRestaurantWithAddressMapper } from '../mappers/prisma-restaurant-with-address-mapper'
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

  async findManyWithAddress({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<RestaurantWithAddress>> {
    const restaurants = await this.prisma.restaurant.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        address: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.restaurant.count()

    return {
      data: restaurants.map(PrismaRestaurantWithAddressMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findManyByProximity({
    latitude,
    longitude,
    radiusInKm,
    page,
    perPage,
  }: ProximityParams): Promise<DataWithPagination<RestaurantWithAddress>> {
    // Primeiro, buscar todos os restaurantes com endereços que tenham coordenadas
    const allRestaurants = await this.prisma.restaurant.findMany({
      include: {
        address: true,
      },
      where: {
        address: {
          latitude: {
            not: null,
          },
          longitude: {
            not: null,
          },
        },
      },
    })

    // Calcular distâncias e filtrar por raio
    const restaurantsWithDistance = allRestaurants
      .map((restaurant) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          restaurant.address.latitude!,
          restaurant.address.longitude!,
        )
        return {
          ...restaurant,
          distance,
        }
      })
      .filter((restaurant) => restaurant.distance <= radiusInKm)
      .sort((a, b) => a.distance - b.distance)

    // Aplicar paginação
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedRestaurants = restaurantsWithDistance.slice(
      startIndex,
      endIndex,
    )

    return {
      data: paginatedRestaurants.map((restaurant) =>
        PrismaRestaurantWithAddressMapper.toDomain(restaurant),
      ),
      actualPage: page,
      totalPages: Math.ceil(restaurantsWithDistance.length / perPage),
      amount: restaurantsWithDistance.length,
      perPage,
    }
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371 // Raio da Terra em quilômetros
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
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

  async findByIdWithAddress(id: string): Promise<RestaurantWithAddress | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
      },
    })

    if (!restaurant) {
      return null
    }

    return PrismaRestaurantWithAddressMapper.toDomain(restaurant)
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
