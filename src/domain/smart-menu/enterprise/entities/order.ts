import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELED'

export interface OrderProps {
  tableNumber?: number | null
  observations?: string | null
  costumerId?: UniqueEntityId | null
  restaurantId: UniqueEntityId
  status: OrderStatus
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  get tableNumber() {
    return this.props.tableNumber
  }

  set tableNumber(tableNumber: number | null | undefined) {
    this.props.tableNumber = tableNumber
    this.touch()
  }

  get observations() {
    return this.props.observations
  }

  set observations(observations: string | null | undefined) {
    this.props.observations = observations
  }

  get costumerId() {
    return this.props.costumerId
  }

  set costumerId(costumerId: UniqueEntityId | null | undefined) {
    this.props.costumerId = costumerId
  }

  get restaurantId() {
    return this.props.restaurantId
  }

  set restaurantId(restaurantId: UniqueEntityId) {
    this.props.restaurantId = restaurantId
  }

  get status() {
    return this.props.status
  }

  set status(status: OrderStatus) {
    this.props.status = status
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
    props: Optional<OrderProps, 'createdAt' | 'status'>,
    id?: UniqueEntityId,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? 'PENDING',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
