import { DishWithCategories } from '@/domain/smart-menu/enterprise/entities/value-objects/dish-with-categories'

export class DishWithCategoriesPresenter {
  static toHTTP(dish: DishWithCategories) {
    return {
      id: dish.dishId.toString(),
      name: dish.name,
      description: dish.description,
      price: dish.price,
      createdAt: dish.createdAt,
      updatedAt: dish.updatedAt,
      categories: dish.categories.map((category) => category.name),
    }
  }
}
