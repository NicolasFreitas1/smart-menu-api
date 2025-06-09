import { DataWithPagination } from '@/core/repositories/data-with-pagination';
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant';
import { RestaurantPresenter } from './restaurant-presenter';

export class RestaurantWithPaginationPresenter {
  static toHTTP(restaurant: DataWithPagination<Restaurant>) {
    return {
      data: restaurant.data.map(RestaurantPresenter.toHTTP),
      amount: restaurant.amount,
      totalPages: restaurant.totalPages,
      actualPage: restaurant.actualPage,
      perPage: restaurant.perPage,
    };
  }
}
