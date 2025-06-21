import { ValueObject } from '@/core/entities/value-object'
import { Restaurant } from '../restaurant'
import { Address } from '../address'

interface RestaurantWithAddressProps {
  restaurant: Restaurant
  address: Address
}

export class RestaurantWithAddress extends ValueObject<RestaurantWithAddressProps> {
  get restaurant() {
    return this.props.restaurant
  }

  get address() {
    return this.props.address
  }

  get restaurantId() {
    return this.props.restaurant.id
  }

  get name() {
    return this.props.restaurant.name
  }

  get createdAt() {
    return this.props.restaurant.createdAt
  }

  get updatedAt() {
    return this.props.restaurant.updatedAt
  }

  static create(props: RestaurantWithAddressProps) {
    return new RestaurantWithAddress(props)
  }
}
