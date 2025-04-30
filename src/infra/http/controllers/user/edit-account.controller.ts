import { EditUserUseCase } from '@/domain/smart-menu/application/use-cases/user/edit-user'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import {
  EditAccountBodySchema,
  bodyValidationPipe,
} from './dtos/edit-account.dto'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EmailAlreadyInUseError } from '@/domain/smart-menu/application/use-cases/__errors/email-already-in-use-error'

@Controller('accounts/:userId')
export class EditAccountController {
  constructor(private editUserUseCase: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
  ) {
    const { email, name } = body

    const result = await this.editUserUseCase.execute({ userId, email, name })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case EmailAlreadyInUseError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
