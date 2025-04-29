import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AddressesRepository } from '@/domain/smart-menu/application/repositories/addresses-repository'
import { Address } from '@/domain/smart-menu/enterprise/entities/address'
import { Injectable } from '@nestjs/common'
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAddressesRepository implements AddressesRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Address>> {
    const addresses = await this.prisma.address.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.address.count()

    return {
      data: addresses.map(PrismaAddressMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findById(id: string): Promise<Address | null> {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
    })

    if (!address) {
      return null
    }

    return PrismaAddressMapper.toDomain(address)
  }

  async findByCEP(cep: string): Promise<Address | null> {
    const address = await this.prisma.address.findFirst({
      where: {
        cep,
      },
    })

    if (!address) {
      return null
    }

    return PrismaAddressMapper.toDomain(address)
  }

  async create(address: Address): Promise<void> {
    const data = PrismaAddressMapper.toPrisma(address)

    await this.prisma.address.create({
      data,
    })
  }

  async save(address: Address): Promise<void> {
    const data = PrismaAddressMapper.toPrisma(address)

    await this.prisma.address.update({
      where: {
        id: address.id.toString(),
      },
      data,
    })
  }
  async delete(address: Address): Promise<void> {
    await this.prisma.address.delete({
      where: {
        id: address.id.toString(),
      },
    })
  }
}
