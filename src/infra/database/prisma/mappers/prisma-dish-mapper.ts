import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish';
import { Prisma, Dish as PrismaDish } from '@prisma/client';

export class PrismaDishMapper {
  static toDomain(raw: PrismaDish): Dish {
    return Dish.create(
      {
        description: raw.description,
        name: raw.name,
        price: raw.price,
        restaurantId: new UniqueEntityId(raw.restaurantId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(dish: Dish): Prisma.DishUncheckedCreateInput {
    return {
      id: dish.id.toString(),
      description: dish.description,
      name: dish.name,
      price: dish.price,
      restaurantId: dish.restaurantId.toString(),
      createdAt: dish.createdAt,
      updatedAt: dish.updatedAt ? new Date(dish.updatedAt) : undefined,
    };
  }
}
