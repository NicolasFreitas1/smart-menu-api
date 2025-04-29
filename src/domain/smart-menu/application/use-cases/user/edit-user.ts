import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error';
import { User } from '@/domain/smart-menu/enterprise/entities/user';

interface EditUserUseCaseRequest {
  userId: string;
  name: string;
  email: string;
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | EmailAlreadyInUseError,
  {
    user: User;
  }
>;

@Injectable()
export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    userId,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (user.email !== email) {
      const emailInUse = await this.usersRepository.findByEmail(email);

      if (emailInUse) {
        return left(new EmailAlreadyInUseError(email));
      }
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return right({ user });
  }
}
