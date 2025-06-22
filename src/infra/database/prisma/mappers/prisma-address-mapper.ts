import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/smart-menu/enterprise/entities/address'
import { Prisma, Address as PrismaAddress } from '@prisma/client'

export class PrismaAddressMapper {
  static toDomain(raw: PrismaAddress): Address {
    return Address.create(
      {
        cep: raw.cep,
        city: raw.city,
        country: raw.country,
        state: raw.state,
        street: raw.street,
        number: raw.number,
        latitude: raw.latitude,
        longitude: raw.longitude,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(address: Address): Prisma.AddressUncheckedCreateInput {
    return {
      id: address.id.toString(),
      cep: address.cep,
      city: address.city,
      country: address.country,
      number: address.number,
      state: address.state,
      street: address.street,
      latitude: address.latitude,
      longitude: address.longitude,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt ? new Date(address.updatedAt) : undefined,
    }
  }
}
