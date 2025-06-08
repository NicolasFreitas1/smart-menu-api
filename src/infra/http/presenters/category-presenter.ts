import { Category } from '@/domain/smart-menu/enterprise/entities/category'

export class CategoryPresenter {
  static toHTTP(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}
