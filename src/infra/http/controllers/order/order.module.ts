import { Module } from "@nestjs/common";
import { CreateOrderController } from "./create-order.controller";
import { UpdateOrderStatusController } from "./update-order-status.controller";
import { GetOrderByIdController } from "./get-order-by-id.controller";
import { ListOrdersByRestaurantController } from "./list-orders-by-restaurant.controller";
import { PrismaService } from "../../../infra/database/prisma.service";
import { PrismaOrderRepository } from "../../../infra/repositories/prisma-orders-repository";
import { OrderRepository } from "../../../domain/smart-menu/repositories/order-repository";

@Module({
  controllers: [
    CreateOrderController,
    UpdateOrderStatusController,
    GetOrderByIdController,
    ListOrdersByRestaurantController,
  ],
  providers: [
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    PrismaService,
  ],
})
export class OrderModule {}