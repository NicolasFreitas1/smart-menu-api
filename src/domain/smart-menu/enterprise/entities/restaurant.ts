import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface RestaurantProps {
  name: string;
  addressId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Restaurant extends Entity<RestaurantProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get addressId() {
    return this.props.addressId;
  }

  set addressId(addressId: UniqueEntityId) {
    this.props.addressId = addressId;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<RestaurantProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const restaurant = new Restaurant(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return restaurant;
  }
}
