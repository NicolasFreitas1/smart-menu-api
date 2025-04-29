import { CreateRestaurantUseCase } from '@/domain/smart-menu/application/use-cases/restaurant/create-restaurant'
import { IsAdminGuard } from '@/infra/auth/is-admin.guard'
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CreateRestaurantBodySchema,
  bodyValidationPipe,
} from './dtos/create-restaurant.dto'
import { IsAdmin } from '@/infra/auth/is-admin'

@Controller('restaurants')
@UseGuards(IsAdminGuard)
export class CreateRestaurantController {
  constructor(private createRestaurantUseCase: CreateRestaurantUseCase) {}

  @Post()
  @IsAdmin()
  async handle(@Body(bodyValidationPipe) body: CreateRestaurantBodySchema) {
    const { address, name } = body

    const result = await this.createRestaurantUseCase.execute({
      address,
      name,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
