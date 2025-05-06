import { ListDishesUseCase } from '@/domain/smart-menu/application/use-cases/dish/list-dishes'
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { DishWithPaginationPresenter } from '../../presenters/dish-with-pagination-presenter'
import { Public } from '@/infra/auth/public'

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

@Controller('dishes')
export class ListDishesController {
  constructor(private listDishesUseCase: ListDishesUseCase) {}

  @Get()
  @Public()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Query('per_page', sizeValidationPipe) perPage: sizeQueryParamSchema,
  ) {
    const result = await this.listDishesUseCase.execute({
      page,
      perPage,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }

    const dishes = result.value.dishes

    return DishWithPaginationPresenter.toHTTP(dishes)
  }
}
