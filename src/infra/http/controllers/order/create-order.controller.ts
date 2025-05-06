import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderUseCase } from "../../../use-cases/order/create-order-use-case";
import { CreateOrderDTO } from "./dtos/create-order-dto";



@Controller("orders")
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async handle(@Body() body: CreateOrderDTO) {
    const { restaurantId, customerId, tableNumber, observations, items } = body;
    await this.createOrderUseCase.execute({
      restaurantId,
      customerId,
      tableNumber,
      observations,
      items,
    });
    return { message: "Pedido criado com sucesso!" };
  }
}