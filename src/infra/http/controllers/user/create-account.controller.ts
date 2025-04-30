import { CreateUserUseCase } from '@/domain/smart-menu/application/use-cases/user/create-user'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import {
  CreateAccountBodySchema,
  bodyValidationPipe,
} from './dtos/create-account.dto'
import { EmailAlreadyInUseError } from '@/domain/smart-menu/application/use-cases/__errors/email-already-in-use-error'

@Public()
@Controller('/accounts')
export class CreateAccountController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateAccountBodySchema) {
    const { email, name, password, restaurantId } = body

    const result = await this.createUserUseCase.execute({
      email,
      name,
      password,
      restaurantId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EmailAlreadyInUseError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
