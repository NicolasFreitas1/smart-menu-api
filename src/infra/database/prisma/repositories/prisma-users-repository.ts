import { PaginationParams } from '@/core/repositories/pagination-params'
import { UsersRepository } from '@/domain/smart-menu/application/repositories/users-repository'
import { User } from '@/domain/smart-menu/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { FilterUser } from '@/domain/smart-menu/application/use-cases/user/filter/filter-user'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Prisma } from 'generated/prisma'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, perPage }: PaginationParams,
    { userName }: FilterUser,
  ): Promise<DataWithPagination<User>> {
    const filter: Prisma.UserWhereInput = {}

    if (userName) {
      filter.name = { contains: userName, mode: 'insensitive' }
    }

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      where: {
        ...filter,
      },
    })

    const countTotal = await this.prisma.user.count({
      where: {
        ...filter,
      },
    })
    const totalPages = Math.max(1, Math.ceil(countTotal / perPage))

    return {
      data: users.map(PrismaUserMapper.toDomain),
      actualPage: page,
      amount: countTotal,
      perPage,
      totalPages,
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({ data })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({ where: { id: data.id }, data })
  }

  async delete(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.delete({ where: { id: data.id } })
  }
}
