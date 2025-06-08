import { DataWithPagination } from '@/core/repositories/data-with-pagination';
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish';
import { DishPresenter } from './dish-presenter';

export class DishWithPaginationPresenter {
  static toHTTP(dish: DataWithPagination<Dish>) {
    return {
      data: dish.data.map(DishPresenter.toHTTP),
      amount: dish.amount,
      totalPages: dish.totalPages,
      actualPage: dish.actualPage,
      perPage: dish.perPage,
    };
  }
}
