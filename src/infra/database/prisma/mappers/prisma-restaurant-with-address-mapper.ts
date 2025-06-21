import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { RestaurantWithAddress } from '@/domain/smart-menu/enterprise/entities/value-objects/restaurant-with-address'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'
import { Address } from '@/domain/smart-menu/enterprise/entities/address'
import {
  Restaurant as PrismaRestaurant,
  Address as PrismaAddress,
} from '@prisma/client'

type PrismaRestaurantWithAddress = PrismaRestaurant & {
  address: PrismaAddress
}

export class PrismaRestaurantWithAddressMapper {
  static toDomain(raw: PrismaRestaurantWithAddress): RestaurantWithAddress {
    const restaurant = Restaurant.create(
      {
        name: raw.name,
        addressId: new UniqueEntityId(raw.addressId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )

    const address = Address.create(
      {
        cep: raw.address.cep,
        street: raw.address.street,
        number: raw.address.number,
        city: raw.address.city,
        state: raw.address.state,
        country: raw.address.country,
        createdAt: raw.address.createdAt,
        updatedAt: raw.address.updatedAt,
      },
      new UniqueEntityId(raw.address.id),
    )

    return RestaurantWithAddress.create({ restaurant, address })
  }
}
