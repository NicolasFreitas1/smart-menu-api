import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthenticateUserController } from './authenticate-user.controller'
import { AuthenticateUserUseCase } from '@/domain/smart-menu/application/use-cases/user/authenticate-user'
import { CreateAccountController } from './create-account.controller'
import { CreateUserUseCase } from '@/domain/smart-menu/application/use-cases/user/create-user'
import { DeleteAccountController } from './delete-account.controller'
import { DeleteUserUseCase } from '@/domain/smart-menu/application/use-cases/user/delete-user'
import { GetUserProfileController } from './get-user-profile.controller'
import { GetUserByIdUseCase } from '@/domain/smart-menu/application/use-cases/user/get-user-by-id'
import { EditAccountController } from './edit-account.controller'
import { EditUserUseCase } from '@/domain/smart-menu/application/use-cases/user/edit-user'
import { EditAccountPasswordController } from './edit-account-password.controller'
import { EditUserPasswordUseCase } from '@/domain/smart-menu/application/use-cases/user/edit-user-password'
import { ListUsersController } from './list-users.controller'
import { ListUsersUseCase } from '@/domain/smart-menu/application/use-cases/user/list-users'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    ListUsersController,
    AuthenticateUserController,
    CreateAccountController,
    GetUserProfileController,
    EditAccountController,
    EditAccountPasswordController,
    DeleteAccountController,
  ],
  providers: [
    ListUsersUseCase,
    AuthenticateUserUseCase,
    CreateUserUseCase,
    GetUserByIdUseCase,
    EditUserUseCase,
    EditUserPasswordUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
