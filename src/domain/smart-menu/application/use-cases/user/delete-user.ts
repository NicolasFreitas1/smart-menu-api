import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteUserUseCaseRequest {
  currentUserId: string;
  userId: string;
}

type DeleteUserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    currentUserId,
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (currentUserId !== user.id.toString()) {
      return left(new NotAllowedError());
    }

    await this.usersRepository.delete(user);

    return right(null);
  }
}
