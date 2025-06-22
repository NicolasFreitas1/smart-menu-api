import { FindRestaurantsByProximityUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/find-restaurants-by-proximity'
import { Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { RestaurantWithAddressPresenter } from '../../presenters/restaurant-with-address-presenter'
import { Public } from '@/infra/auth/public'

const findRestaurantsByProximityQuerySchema = z.object({
  latitude: z.string().transform(Number),
  longitude: z.string().transform(Number),
  radiusInKm: z.string().transform(Number).default('10'),
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('20'),
})

type FindRestaurantsByProximityQuerySchema = z.infer<
  typeof findRestaurantsByProximityQuerySchema
>

@Public()
@Controller('/restaurants/search/proximity')
export class FindRestaurantsByProximityController {
  constructor(
    private findRestaurantsByProximity: FindRestaurantsByProximityUseCase,
  ) {}

  @Get()
  async handle(
    @Query(new ZodValidationPipe(findRestaurantsByProximityQuerySchema))
    query: FindRestaurantsByProximityQuerySchema,
  ) {
    const { latitude, longitude, radiusInKm, page, perPage } = query

    const result = await this.findRestaurantsByProximity.execute({
      latitude,
      longitude,
      radiusInKm,
      page,
      perPage,
    })

    return {
      restaurants: result.restaurants.map(
        RestaurantWithAddressPresenter.toHTTP,
      ),
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    }
  }
}
