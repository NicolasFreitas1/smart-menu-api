import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '@/domain/smart-menu/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../../repositories/orders-repository'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'

interface CreateOrderUseCaseRequest {
  costumerId?: string | null
  observations?: string | null
  tableNumber?: number | null
  restaurantId: string
}

type CreateOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private restaurantsRepository: RestaurantsRepository,
  ) {}

  async execute({
    costumerId,
    observations,
    tableNumber,
    restaurantId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
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

    await this.ordersRepository.create(order)

    return right({
      order,
    })
  }
}
