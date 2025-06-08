import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { DishWithCategories } from '@/domain/smart-menu/enterprise/entities/value-objects/dish-with-categories'
import { DishWithCategoriesPresenter } from './dish-with-categories-presenter'

export class DishWithCategoriesWithPaginationPresenter {
  static toHTTP(dish: DataWithPagination<DishWithCategories>) {
    return {
      data: dish.data.map(DishWithCategoriesPresenter.toHTTP),
      amount: dish.amount,
      totalPages: dish.totalPages,
      actualPage: dish.actualPage,
      perPage: dish.perPage,
    }
  }
}
