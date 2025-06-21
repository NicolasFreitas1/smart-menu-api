import { Controller, Get, Query } from '@nestjs/common'
import { ListRestaurantsWithAddressUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/list-restaurants-with-address'
import { RestaurantWithAddressPresenter } from '../../presenters/restaurant-with-address-presenter'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const listRestaurantsWithAddressQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  perPage: z.coerce.number().optional().default(10),
})

type ListRestaurantsWithAddressQuerySchema = z.infer<
  typeof listRestaurantsWithAddressQuerySchema
>

@Controller('/restaurants')
export class ListRestaurantsWithAddressController {
  constructor(
    private listRestaurantsWithAddress: ListRestaurantsWithAddressUseCase,
  ) {}

  @Get('/with-address')
  async handle(
    @Query(new ZodValidationPipe(listRestaurantsWithAddressQuerySchema))
    query: ListRestaurantsWithAddressQuerySchema,
  ) {
    const { page, perPage } = query

    const result = await this.listRestaurantsWithAddress.execute({
      page,
      perPage,
    })

    if (result.isLeft()) {
      throw result.value
    }

    const restaurants = result.value.restaurants

    return {
      restaurants: restaurants.data.map(RestaurantWithAddressPresenter.toHTTP),
      pagination: {
        page: restaurants.actualPage,
        perPage: restaurants.perPage,
        total: restaurants.amount,
        totalPages: restaurants.totalPages,
      },
    }
  }
}
