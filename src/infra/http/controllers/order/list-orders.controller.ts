import { ListOrdersUseCase } from '@/domain/smart-menu/application/use-cases/order/list-orders'
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { OrderWithPaginationPresenter } from '../../presenters/order-with-pagination-presenter'

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

@Controller('orders')
export class ListOrdersController {
  constructor(private listOrdersUseCase: ListOrdersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Query('per_page', sizeValidationPipe) perPage: sizeQueryParamSchema,
  ) {
    const result = await this.listOrdersUseCase.execute({
      page,
      perPage,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }

    const orders = result.value.orders

    return OrderWithPaginationPresenter.toHTTP(orders)
  }
}
