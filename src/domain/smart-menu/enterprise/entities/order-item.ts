import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderItemProps {
  orderId: UniqueEntityId
  dishId: UniqueEntityId
  quantity: number
  createdAt: Date
  updatedAt?: Date | null
}

export class OrderItem extends Entity<OrderItemProps> {
  get orderId() {
    return this.props.orderId
  }

  set orderId(orderId: UniqueEntityId) {
    this.props.orderId = orderId
    this.touch()
  }

  get dishId() {
    return this.props.dishId
  }

  set dishId(dishId: UniqueEntityId) {
    this.props.dishId = dishId
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
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

  static create(
    props: Optional<OrderItemProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const orderItem = new OrderItem(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return orderItem
  }
}
