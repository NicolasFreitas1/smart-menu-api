import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { WrongCredentialsError } from '@/domain/smart-menu/application/use-cases/__errors/wrong-credentials-error'
import { EditUserPasswordUseCase } from '@/domain/smart-menu/application/use-cases/user/edit-user-password'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  UnprocessableEntityException,
} from '@nestjs/common'
import {
  EditAccountPasswordBodySchema,
  bodyValidationPipe,
} from './dtos/edit-account-password.dto'

@Controller('accounts/:userId/password')
export class EditAccountPasswordController {
  constructor(private editUserPasswordUseCase: EditUserPasswordUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(bodyValidationPipe) body: EditAccountPasswordBodySchema,
  ) {
    const { newPassword, oldPassword } = body

    const result = await this.editUserPasswordUseCase.execute({
      userId,
      newPassword,
      oldPassword,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case WrongCredentialsError:
          throw new UnprocessableEntityException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
