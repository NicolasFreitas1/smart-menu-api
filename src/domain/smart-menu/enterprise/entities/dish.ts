import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DishProps {
  name: string
  description: string
  price: number
  restaurantId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class Dish extends Entity<DishProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
  }

  get restaurantId() {
    return this.props.restaurantId
  }

  set restaurantId(restaurantId: UniqueEntityId) {
    this.props.restaurantId = restaurantId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<DishProps, 'createdAt'>, id?: UniqueEntityId) {
    const dish = new Dish(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return dish
  }
}
