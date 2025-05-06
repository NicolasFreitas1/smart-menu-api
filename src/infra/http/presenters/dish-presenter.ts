import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'

export class DishPresenter {
  static toHTTP(dish: Dish) {
    return {
      id: dish.id.toString(),
      name: dish.name,
      description: dish.description,
      price: dish.price,
      createdAt: dish.createdAt,
      updatedAt: dish.updatedAt,
    }
  }
}
