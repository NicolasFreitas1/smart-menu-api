import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '@/domain/smart-menu/enterprise/entities/user';

interface GetUserByEmailUseCaseRequest {
  userEmail: string;
}

type GetUserByEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userEmail,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(userEmail);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({ user });
  }
}
