import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Category } from '../category'

interface DishWithCategoriesProps {
  dishId: UniqueEntityId
  name: string
  description: string
  price: number
  restaurantId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
  categories: Category[]
}

export class DishWithCategories extends ValueObject<DishWithCategoriesProps> {
  get dishId() {
    return this.props.dishId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get price() {
    return this.props.price
  }

  get restaurantId() {
    return this.props.restaurantId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get categories() {
    return this.props.categories
  }

  static create(props: DishWithCategoriesProps) {
    return new DishWithCategories(props)
  }
}
