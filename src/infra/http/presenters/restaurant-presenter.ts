import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'

export class RestaurantPresenter {
  static toHTTP(restaurant: Restaurant) {
    return {
      id: restaurant.id.toString(),
      addressId: restaurant.addressId.toString(),
      name: restaurant.name,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    }
  }
}
