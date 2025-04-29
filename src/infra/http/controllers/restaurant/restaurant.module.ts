import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateRestaurantController } from './create-restaurant.controller'
import { CreateRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/create-restaurant'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateRestaurantController],
  providers: [CreateRestaurantUseCase],
})
export class RestaurantModule {}
