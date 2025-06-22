import { RestaurantWithAddress } from '@/domain/smart-menu/enterprise/entities/value-objects/restaurant-with-address'

export class RestaurantWithAddressPresenter {
  static toHTTP(restaurantWithAddress: RestaurantWithAddress) {
    return {
      id: restaurantWithAddress.restaurantId.toString(),
      name: restaurantWithAddress.name,
      address: {
        id: restaurantWithAddress.address.id.toString(),
        cep: restaurantWithAddress.address.cep,
        street: restaurantWithAddress.address.street,
        number: restaurantWithAddress.address.number,
        city: restaurantWithAddress.address.city,
        state: restaurantWithAddress.address.state,
        country: restaurantWithAddress.address.country,
        latitude: restaurantWithAddress.address.latitude,
        longitude: restaurantWithAddress.address.longitude,
      },
      createdAt: restaurantWithAddress.createdAt,
      updatedAt: restaurantWithAddress.updatedAt,
    }
  }
}
