import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DishCategory } from '@/domain/smart-menu/enterprise/entities/dish-category'
import { Prisma, DishCategory as PrismaDishCategory } from '@prisma/client'

export class PrismaDishCategoryMapper {
  static toDomain(raw: PrismaDishCategory): DishCategory {
    return DishCategory.create(
      {
        categoryId: new UniqueEntityId(raw.categoryId),
        dishId: new UniqueEntityId(raw.dishId),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    dishCategory: DishCategory,
  ): Prisma.DishCategoryUncheckedCreateInput {
    return {
      id: dishCategory.id.toString(),
      categoryId: dishCategory.categoryId.toString(),
      dishId: dishCategory.dishId.toString(),
      createdAt: dishCategory.createdAt,
      updatedAt: dishCategory.updatedAt ? dishCategory.updatedAt : undefined,
    }
  }
}
