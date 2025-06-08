import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { CategoriesRepository } from '@/domain/smart-menu/application/repositories/categories-repository'
import { Category } from '@/domain/smart-menu/enterprise/entities/category'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Category>> {
    const categories = await this.prisma.category.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.category.count()

    return {
      data: categories.map(PrismaCategoryMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findManyWithoutPagination(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany()

    return categories.map(PrismaCategoryMapper.toDomain)
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!category) return null

    return PrismaCategoryMapper.toDomain(category)
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: { name },
    })

    if (!category) return null

    return PrismaCategoryMapper.toDomain(category)
  }

  async findManyByNames(names: string[]): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        name: { in: names },
      },
    })

    return categories.map(PrismaCategoryMapper.toDomain)
  }

  async create(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.create({
      data,
    })
  }

  async save(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(category: Category): Promise<void> {
    await this.prisma.category.delete({
      where: { id: category.id.toString() },
    })
  }
}
