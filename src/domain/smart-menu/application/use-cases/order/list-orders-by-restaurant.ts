import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../../repositories/orders-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'

interface ListOrdersByRestaurantUseCaseRequest {
  restaurantId: string
  page: number
  perPage: number
}

type ListOrdersByRestaurantUseCaseResponse = Either<
  null,
  {
    orders: DataWithPagination<Order>
  }
>

@Injectable()
export class ListOrdersByRestaurantUseCaseUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    page,
    perPage,
    restaurantId,
  }: ListOrdersByRestaurantUseCaseRequest): Promise<ListOrdersByRestaurantUseCaseResponse> {
    const orders = await this.ordersRepository.findManyByRestaurant(
      {
        page,
        perPage,
      },
      restaurantId,
    )

    return right({ orders })
  }
}
