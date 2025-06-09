import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/smart-menu/enterprise/entities/category'
import { Prisma, Category as PrismaCategory } from '@prisma/client'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt ? category.updatedAt : undefined,
    }
  }
}
