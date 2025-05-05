import { Controller, Get, Param } from "@nestjs/common";
import { ListOrdersByRestaurantUseCase } from "../../../use-cases/order/list-orders-by-restaurant-use-case";

@Controller("orders")
export class ListOrdersByRestaurantController {
  constructor(private listOrdersByRestaurantUseCase: ListOrdersByRestaurantUseCase) {}

  @Get("restaurant/:restaurantId")
  async handle(@Param("restaurantId") restaurantId: string) {
    const orders = await this.listOrdersByRestaurantUseCase.execute({ restaurantId });
    return orders;
  }
}