import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RestaurantsRepository } from '@/domain/smart-menu/application/repositories/restaurants-repository'
import { PrismaRestaurantsRepository } from './prisma/repositories/prisma-restaurants-repository'
import { AddressesRepository } from '@/domain/smart-menu/application/repositories/addresses-repository'
import { PrismaAddressesRepository } from './prisma/repositories/prisma-addresses-repository'
import { UsersRepository } from '@/domain/smart-menu/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { DishesRepository } from '@/domain/smart-menu/application/repositories/dishes-repository'
import { PrismaDishesRepository } from './prisma/repositories/prisma-dishes-repository'
import { OrderItensRepository } from '@/domain/smart-menu/application/repositories/order-itens-repository'
import { PrismaOrderItensRepository } from './prisma/repositories/prisma-order-items-repository'
import { OrdersRepository } from '@/domain/smart-menu/application/repositories/orders-repository'
import { PrismaOrdersRepository } from './prisma/repositories/prisma-orders-repository'
import { CategoriesRepository } from '@/domain/smart-menu/application/repositories/categories-repository'
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories-repository'
import { PrismaDishCategoriesRepository } from './prisma/repositories/prisma-dish-categories-repository'
import { DishCategoriesRepository } from '@/domain/smart-menu/application/repositories/dish-categories-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: RestaurantsRepository,
      useClass: PrismaRestaurantsRepository,
    },
    {
      provide: AddressesRepository,
      useClass: PrismaAddressesRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: DishesRepository,
      useClass: PrismaDishesRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
    {
      provide: OrderItensRepository,
      useClass: PrismaOrderItensRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: DishCategoriesRepository,
      useClass: PrismaDishCategoriesRepository,
    },
  ],
  exports: [
    PrismaService,
    RestaurantsRepository,
    AddressesRepository,
    UsersRepository,
    DishesRepository,
    OrdersRepository,
    OrderItensRepository,
    CategoriesRepository,
    DishCategoriesRepository,
  ],
})
export class DatabaseModule {}
