import { Controller, Get, Param } from '@nestjs/common'
import { GetRestaurantByIdWithAddressUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/get-restaurant-by-id-with-address'
import { RestaurantWithAddressPresenter } from '../../presenters/restaurant-with-address-presenter'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const getRestaurantByIdWithAddressParamSchema = z.object({
  id: z.string().uuid(),
})

type GetRestaurantByIdWithAddressParamSchema = z.infer<
  typeof getRestaurantByIdWithAddressParamSchema
>

@Controller('/restaurants')
export class GetRestaurantByIdWithAddressController {
  constructor(
    private getRestaurantByIdWithAddress: GetRestaurantByIdWithAddressUseCase,
  ) {}

  @Get('/:id/with-address')
  async handle(
    @Param(new ZodValidationPipe(getRestaurantByIdWithAddressParamSchema))
    params: GetRestaurantByIdWithAddressParamSchema,
  ) {
    const { id } = params

    const result = await this.getRestaurantByIdWithAddress.execute({
      id,
    })

    if (result.isLeft()) {
      throw result.value
    }

    return RestaurantWithAddressPresenter.toHTTP(result.value.restaurant)
  }
}
