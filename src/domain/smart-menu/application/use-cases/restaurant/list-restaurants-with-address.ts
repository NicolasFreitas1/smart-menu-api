import { Either, right } from '@/core/either'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { RestaurantWithAddress } from '../../../enterprise/entities/value-objects/restaurant-with-address'
import { Injectable } from '@nestjs/common'

export interface ListRestaurantsWithAddressUseCaseRequest {
  page: number
  perPage: number
}

type ListRestaurantsWithAddressUseCaseResponse = Either<
  null,
  { restaurants: DataWithPagination<RestaurantWithAddress> }
>

@Injectable()
export class ListRestaurantsWithAddressUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    page,
    perPage,
  }: ListRestaurantsWithAddressUseCaseRequest): Promise<ListRestaurantsWithAddressUseCaseResponse> {
    const restaurants = await this.restaurantsRepository.findManyWithAddress({
      page,
      perPage,
    })

    return right({ restaurants })
  }
}
