import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetOrderByIdUseCase } from '@/domain/smart-menu/application/use-cases/order/get-order-by-id'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { OrderPresenter } from '../../presenters/order-presenter'
import { Public } from '@/infra/auth/public'

@Controller('orders/:orderId')
export class GetOrderByIdController {
  constructor(private getOrderByIdUseCase: GetOrderByIdUseCase) {}

  @Get()
  @Public()
  async handle(@Param('orderId', ParseUUIDPipe) orderId: string) {
    const result = await this.getOrderByIdUseCase.execute({
      orderId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const order = result.value.order

    return {
      order: OrderPresenter.toHTTP(order),
    }
  }
}
