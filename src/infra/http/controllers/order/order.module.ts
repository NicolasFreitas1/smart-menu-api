import { Module } from '@nestjs/common'
import { CreateOrderWithItensController } from './create-order-with-itens.controller'
import { CreateOrderController } from './create-order.controller'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeleteOrderController } from './delete-order.controller'
import { GetOrderByIdController } from './get-order-by-id.controller'
import { ListOrdersController } from './list-orders.controller'
import { CreateOrderUseCase } from '@/domain/smart-menu/application/use-cases/order/create-order'
import { CreateOrderWithItensUseCase } from '@/domain/smart-menu/application/use-cases/order/create-order-with-itens'
import { DeleteOrderUseCase } from '@/domain/smart-menu/application/use-cases/order/delete-order'
import { GetOrderByIdUseCase } from '@/domain/smart-menu/application/use-cases/order/get-order-by-id'
import { ListOrdersUseCase } from '@/domain/smart-menu/application/use-cases/order/list-orders'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateOrderWithItensController,
    CreateOrderController,
    DeleteOrderController,
    GetOrderByIdController,
    ListOrdersController,
  ],
  providers: [
    CreateOrderWithItensUseCase,
    CreateOrderUseCase,
    DeleteOrderUseCase,
    GetOrderByIdUseCase,
    ListOrdersUseCase,
  ],
})
export class OrderModule {}
