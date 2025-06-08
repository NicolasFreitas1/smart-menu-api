import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DishCategoriesRepository } from '@/domain/smart-menu/application/repositories/dish-categories-repository'
import { DishCategory } from '@/domain/smart-menu/enterprise/entities/dish-category'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaDishCategoryMapper } from '../mappers/prisma-dish-category-mapper'

@Injectable()
export class PrismaDishCategoriesRepository
  implements DishCategoriesRepository
{
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<DishCategory>> {
    const dishCategories = await this.prisma.dishCategory.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await this.prisma.category.count()

    return {
      data: dishCategories.map(PrismaDishCategoryMapper.toDomain),
      actualPage: page,
      totalPages: Math.ceil(total / perPage),
      amount: total,
      perPage,
    }
  }

  async findManyWithoutPagination(): Promise<DishCategory[]> {
    const dishCategories = await this.prisma.dishCategory.findMany()

    return dishCategories.map(PrismaDishCategoryMapper.toDomain)
  }

  async findById(id: string): Promise<DishCategory | null> {
    const dishCategory = await this.prisma.dishCategory.findUnique({
      where: { id },
    })

    if (!dishCategory) return null

    return PrismaDishCategoryMapper.toDomain(dishCategory)
  }

  async create(dishCategory: DishCategory): Promise<void> {
    const data = PrismaDishCategoryMapper.toPrisma(dishCategory)

    await this.prisma.dishCategory.create({
      data,
    })
  }

  async createMany(dishCategories: DishCategory[]): Promise<void> {
    const data = dishCategories.map(PrismaDishCategoryMapper.toPrisma)

    await this.prisma.dishCategory.createMany({
      data,
    })
  }

  async save(dishCategory: DishCategory): Promise<void> {
    const data = PrismaDishCategoryMapper.toPrisma(dishCategory)

    await this.prisma.dishCategory.update({
      data,
      where: { id: data.id },
    })
  }

  async delete(dishCategory: DishCategory): Promise<void> {
    await this.prisma.dishCategory.delete({
      where: { id: dishCategory.id.toString() },
    })
  }
}
