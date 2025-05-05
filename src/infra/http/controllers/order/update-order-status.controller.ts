import { Body, Controller, Param, Put } from "@nestjs/common";
import { UpdateOrderStatusUseCase } from "../../../use-cases/order/update-order-status-use-case";
import { UpdateOrderStatusDTO } from "./dtos/update-order-status-dto";

@Controller("orders")
export class UpdateOrderStatusController {
  constructor(private updateOrderStatusUseCase: UpdateOrderStatusUseCase) {}

  @Put(":id/status")
  async handle(@Param("id") orderId: string, @Body() body: UpdateOrderStatusDTO) {
    await this.updateOrderStatusUseCase.execute({
      orderId,
      status: body.status,
    });
    return { message: "Status atualizado!" };
  }
}