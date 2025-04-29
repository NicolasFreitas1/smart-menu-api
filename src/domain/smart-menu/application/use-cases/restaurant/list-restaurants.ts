import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Restaurant } from '@/domain/smart-menu/enterprise/entities/restaurant'

interface ListRestaurantsUseCaseRequest {
  page: number
  perPage: number
}

type ListRestaurantsUseCaseResponse = Either<
  null,
  {
    restaurants: DataWithPagination<Restaurant>
  }
>

@Injectable()
export class ListRestaurantsUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    page,
    perPage,
  }: ListRestaurantsUseCaseRequest): Promise<ListRestaurantsUseCaseResponse> {
    const restaurants = await this.restaurantsRepository.findMany({
      page,
      perPage,
    })

    return right({ restaurants })
  }
}
