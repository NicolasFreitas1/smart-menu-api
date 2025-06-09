import { CreateOrderWithItensUseCase } from "@/domain/smart-menu/application/use-cases/order/create-order-with-itens";
import { IsAdmin } from "@/infra/auth/is-admin";
import { IsAdminGuard } from "@/infra/auth/is-admin.guard";
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  CreateOrderWithItensBodySchema,
  bodyValidationPipe,
} from "./dtos/create-order-with-itens.dto";
import { Public } from "@/infra/auth/public";

@Controller("orders/with-itens")
export class CreateOrderWithItensController {
  constructor(
    private createOrderWithItensUseCase: CreateOrderWithItensUseCase
  ) {}

  @Post()
  @Public()
  async handle(@Body(bodyValidationPipe) body: CreateOrderWithItensBodySchema) {
    const {
      costumerId,
      observations,
      tableNumber,
      restaurantId,
      orderItens,
    } = body;

    const result = await this.createOrderWithItensUseCase.execute({
      restaurantId,
      costumerId,
      observations,
      tableNumber,
      orderItens,
    });

    if (result.isLeft()) {
      console.log(result);

      throw new InternalServerErrorException("Something went wrong");
    }
  }
}
