import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetUserByIdUseCase } from '@/domain/smart-menu/application/use-cases/user/get-user-by-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
} from '@nestjs/common'
import { UserPresenter } from '../../presenters/user-presenter'

@Controller('accounts/me')
export class GetUserProfileController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get()
  async handle(@CurrentUser() currentUser: UserPayload) {
    const result = await this.getUserByIdUseCase.execute({
      userId: currentUser.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const user = result.value.user

    return {
      user: UserPresenter.toHTTP(user),
    }
  }
}
