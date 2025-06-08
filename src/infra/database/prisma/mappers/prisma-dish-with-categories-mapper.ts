import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DishWithCategories } from '@/domain/smart-menu/enterprise/entities/value-objects/dish-with-categories'
import {
  Dish as PrismaDish,
  DishCategory as PrismaDishCategory,
  Category as PrismaCategory,
} from '@prisma/client'
import { PrismaCategoryMapper } from './prisma-category-mapper'

type DishCategoriesWithCategory = PrismaDishCategory & {
  category: PrismaCategory
}

type PrismaDishWithCategories = PrismaDish & {
  categories: DishCategoriesWithCategory[]
}

export class PrismaDishWithCategoriesMapper {
  static toDomain(raw: PrismaDishWithCategories): DishWithCategories {
    return DishWithCategories.create({
      dishId: new UniqueEntityId(raw.id),
      restaurantId: new UniqueEntityId(raw.restaurantId),
      name: raw.name,
      description: raw.description,
      price: raw.price,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ? raw.updatedAt : undefined,
      categories: raw.categories.map((category) =>
        PrismaCategoryMapper.toDomain(category.category),
      ),
    })
  }
}
