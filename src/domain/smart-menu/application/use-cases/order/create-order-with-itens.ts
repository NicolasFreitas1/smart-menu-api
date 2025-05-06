import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../../repositories/orders-repository'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { OrderItem } from '@/domain/smart-menu/enterprise/entities/order-item'
import { OrderItensRepository } from '../../repositories/order-itens-repository'

interface CreateOrderItensRequest {
  dishId: string
  quantity: number
}

interface CreateOrderWithItensUseCaseRequest {
  costumerId?: string | null
  observations?: string | null
  tableNumber?: number | null
  restaurantId: string
  orderItens: CreateOrderItensRequest[]
}

type CreateOrderWithItensUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderWithItensUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private restaurantsRepository: RestaurantsRepository,
    private orderItemsRepository: OrderItensRepository,
  ) {}

  async execute({
    costumerId,
    observations,
    tableNumber,
    restaurantId,
    orderItens,
  }: CreateOrderWithItensUseCaseRequest): Promise<CreateOrderWithItensUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    const order = Order.create({
      costumerId: costumerId ? new UniqueEntityId(costumerId) : undefined,
      observations,
      tableNumber,
      restaurantId: restaurant.id,
    })

    const orderItensCreated: OrderItem[] = []

    for (const orderItem of orderItens) {
      const orderItemCreated = OrderItem.create({
        dishId: new UniqueEntityId(orderItem.dishId),
        orderId: order.id,
        quantity: orderItem.quantity,
      })

      orderItensCreated.push(orderItemCreated)
    }

    await this.ordersRepository.create(order)
    await this.orderItemsRepository.createMany(orderItensCreated)

    return right({
      order,
    })
  }
}
