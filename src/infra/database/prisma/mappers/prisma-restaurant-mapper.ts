import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'
import { Prisma, Restaurant as PrismaRestaurant } from '@prisma/client'

export class PrismaRestaurantMapper {
  static toDomain(raw: PrismaRestaurant): Restaurant {
    return Restaurant.create(
      {
        name: raw.name,
        addressId: new UniqueEntityId(raw.addressId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    restaurant: Restaurant,
  ): Prisma.RestaurantUncheckedCreateInput {
    return {
      id: restaurant.id.toString(),
      addressId: restaurant.addressId.toString(),
      name: restaurant.name,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt
        ? new Date(restaurant.updatedAt)
        : undefined,
    }
  }
}
