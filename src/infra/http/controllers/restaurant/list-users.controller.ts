import { ListRestaurantsUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/list-restaurants'
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { RestaurantWithPaginationPresenter } from '../../presenters/restaurant-with-pagination-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const sizeQueryParamSchema = z
  .string()
  .optional()
  .default('20')
  .transform(Number)
  .pipe(z.number().min(1))

const sizeValidationPipe = new ZodValidationPipe(sizeQueryParamSchema)

type sizeQueryParamSchema = z.infer<typeof sizeQueryParamSchema>

@Controller('restaurants')
export class ListRestaurantsController {
  constructor(private listRestaurantsUseCase: ListRestaurantsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Query('per_page', sizeValidationPipe) perPage: sizeQueryParamSchema,
  ) {
    const result = await this.listRestaurantsUseCase.execute({
      page,
      perPage,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }

    const restaurants = result.value.restaurants

    return RestaurantWithPaginationPresenter.toHTTP(restaurants)
  }
}
