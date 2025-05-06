import { CreateDishUseCase } from '@/domain/smart-menu/application/use-cases/dish/create-dish'
import { IsAdminGuard } from '@/infra/auth/is-admin.guard'
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CreateDishBodySchema,
  bodyValidationPipe,
} from './dtos/create-dish.dto'
import { IsAdmin } from '@/infra/auth/is-admin'

@Controller('dishes')
@UseGuards(IsAdminGuard)
export class CreateDishController {
  constructor(private createDishUseCase: CreateDishUseCase) {}

  @Post()
  @IsAdmin()
  async handle(@Body(bodyValidationPipe) body: CreateDishBodySchema) {
    const { description, name, price, restaurantId } = body

    const result = await this.createDishUseCase.execute({
      description,
      name,
      price,
      restaurantId,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
