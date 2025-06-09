import { ListDishesByRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/dish/list-dishes-by-restaurant'
import { Public } from '@/infra/auth/public'
import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { DishWithCategoriesWithPaginationPresenter } from '../../presenters/dish-with-categories-with-pagination-presenter'

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

@Controller('dishes/restaurant/:restaurantId')
export class ListDishesByRestaurantController {
  constructor(private listDishesUseCase: ListDishesByRestaurantUseCase) {}

  @Get()
  @Public()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Query('per_page', sizeValidationPipe) perPage: sizeQueryParamSchema,
    @Query('categoryFilter') categoryFilter: string,
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
  ) {
    const result = await this.listDishesUseCase.execute({
      restaurantId,
      page,
      perPage,
      categoryFilter,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }

    const dishes = result.value.dishes

    return DishWithCategoriesWithPaginationPresenter.toHTTP(dishes)
  }
}
