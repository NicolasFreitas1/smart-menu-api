import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: string
  email: string
  password: string
  isAdmin: boolean
  restaurantId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get isAdmin() {
    return this.props.isAdmin
  }

  set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin
    this.touch()
  }

  get restaurantId() {
    return this.props.restaurantId
  }

  set restaurantId(restaurantId: UniqueEntityId) {
    this.props.restaurantId = restaurantId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'isAdmin'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        isAdmin: props.isAdmin ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
