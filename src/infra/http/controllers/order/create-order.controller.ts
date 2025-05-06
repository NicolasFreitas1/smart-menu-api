import { CreateOrderUseCase } from '@/domain/smart-menu/application/use-cases/order/create-order'
import { IsAdminGuard } from '@/infra/auth/is-admin.guard'
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CreateOrderBodySchema,
  bodyValidationPipe,
} from './dtos/create-order.dto'
import { IsAdmin } from '@/infra/auth/is-admin'

@Controller('orders')
@UseGuards(IsAdminGuard)
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @IsAdmin()
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
