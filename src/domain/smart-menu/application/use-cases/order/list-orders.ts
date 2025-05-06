import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../../repositories/orders-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'

interface ListOrdersUseCaseRequest {
  page: number
  perPage: number
}

type ListOrdersUseCaseResponse = Either<
  null,
  {
    orders: DataWithPagination<Order>
  }
>

@Injectable()
export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    page,
    perPage,
  }: ListOrdersUseCaseRequest): Promise<ListOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findMany({
      page,
      perPage,
    })

    return right({ orders })
  }
}
