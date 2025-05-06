import { Controller, Get, Param } from "@nestjs/common";
import { GetOrderByIdUseCase } from "../../../use-cases/order/get-order-by-id-use-case";

@Controller("orders")
export class GetOrderByIdController {
  constructor(private getOrderByIdUseCase: GetOrderByIdUseCase) {}

  @Get(":id")
  async handle(@Param("id") orderId: string) {
    const order = await this.getOrderByIdUseCase.execute({ orderId });
    return order;
  }
}