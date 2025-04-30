import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RestaurantsRepository } from '@/domain/smart-menu/application/repositories/restaurants-repository'
import { PrismaRestaurantsRepository } from './prisma/repositories/prisma-restaurants-repository'
import { AddressesRepository } from '@/domain/smart-menu/application/repositories/addresses-repository'
import { PrismaAddressesRepository } from './prisma/repositories/prisma-addresses-repository'
import { UsersRepository } from '@/domain/smart-menu/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

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
  ],
  exports: [
    PrismaService,
    RestaurantsRepository,
    AddressesRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
