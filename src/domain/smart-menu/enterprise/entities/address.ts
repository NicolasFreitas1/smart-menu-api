import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AddressProps {
  cep: string
  street: string
  number?: string | null
  city: string
  state: string
  country: string
  latitude?: number | null
  longitude?: number | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Address extends Entity<AddressProps> {
  get cep() {
    return this.props.cep
  }

  set cep(cep: string) {
    this.props.cep = cep
    this.touch()
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
    this.touch()
  }

  get number() {
    return this.props.number
  }

  set number(number: string | null | undefined) {
    this.props.number = number
    this.touch()
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  get country() {
    return this.props.country
  }

  set country(country: string) {
    this.props.country = country
    this.touch()
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number | null | undefined) {
    this.props.latitude = latitude
    this.touch()
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number | null | undefined) {
    this.props.longitude = longitude
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
    props: Optional<AddressProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const address = new Address(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return address
  }
}
