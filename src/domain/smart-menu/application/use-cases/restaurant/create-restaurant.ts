import { Either, right } from '@/core/either'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'
import { Injectable } from '@nestjs/common'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { AddressesRepository } from '../../repositories/addresses-repository'
import { Address } from '@/domain/smart-menu/enterprise/entities/address'

interface CreateAddressRequest {
  cep: string
  street: string
  number?: string | null
  city: string
  state: string
  country: string
}

interface CreateRestaurantUseCaseRequest {
  name: string
  address: CreateAddressRequest
}

type CreateRestaurantUseCaseResponse = Either<null, { restaurant: Restaurant }>

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    private restaurantsRepository: RestaurantsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    name,
    address: { cep, city, country, state, street, number },
  }: CreateRestaurantUseCaseRequest): Promise<CreateRestaurantUseCaseResponse> {
    const address = Address.create({
      cep,
      city,
      country,
      state,
      street,
      number,
    })

    await this.addressesRepository.create(address)

    const restaurant = Restaurant.create({
      name,
      addressId: address.id,
    })

    await this.restaurantsRepository.create(restaurant)

    return right({ restaurant })
  }
}
