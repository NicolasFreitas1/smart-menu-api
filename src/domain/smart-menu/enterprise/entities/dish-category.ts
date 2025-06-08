import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface DishCategoryProps {
  dishId: UniqueEntityId
  categoryId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class DishCategory extends Entity<DishCategoryProps> {
  get dishId() {
    return this.props.dishId
  }

  set dishId(dishId: UniqueEntityId) {
    this.props.dishId = dishId
  }

  get categoryId() {
    return this.props.categoryId
  }

  set categoryId(categoryId: UniqueEntityId) {
    this.props.categoryId = categoryId
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
    props: Optional<DishCategoryProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const dishCategory = new DishCategory(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return dishCategory
  }
}
