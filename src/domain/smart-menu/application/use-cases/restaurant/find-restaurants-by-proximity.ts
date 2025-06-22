import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { RestaurantWithAddress } from '../../../enterprise/entities/value-objects/restaurant-with-address'
import { Injectable } from '@nestjs/common'

export interface FindRestaurantsByProximityUseCaseRequest {
  latitude: number
  longitude: number
  radiusInKm: number
  page?: number
  perPage?: number
}

export interface FindRestaurantsByProximityUseCaseResponse {
  restaurants: RestaurantWithAddress[]
  totalCount: number
  totalPages: number
  currentPage: number
}

@Injectable()
export class FindRestaurantsByProximityUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    latitude,
    longitude,
    radiusInKm,
    page = 1,
    perPage = 20,
  }: FindRestaurantsByProximityUseCaseRequest): Promise<FindRestaurantsByProximityUseCaseResponse> {
    const result = await this.restaurantsRepository.findManyByProximity({
      latitude,
      longitude,
      radiusInKm,
      page,
      perPage,
    })

    return {
      restaurants: result.data,
      totalCount: result.amount,
      totalPages: result.totalPages,
      currentPage: result.actualPage,
    }
  }
}
