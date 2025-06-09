import { CreateOrderUseCase } from '@/domain/smart-menu/application/use-cases/order/create-order'
import { IsAdmin } from '@/infra/auth/is-admin'
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import {
  CreateOrderBodySchema,
  bodyValidationPipe,
} from './dtos/create-order.dto'
import { Public } from '@/infra/auth/public'

@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @Public()
  async handle(@Body(bodyValidationPipe) body: CreateOrderBodySchema) {
    const { costumerId, observations, tableNumber, restaurantId } = body

    const result = await this.createOrderUseCase.execute({
      restaurantId,
      costumerId,
      observations,
      tableNumber,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
