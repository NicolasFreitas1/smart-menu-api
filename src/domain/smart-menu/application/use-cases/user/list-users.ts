import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { DataWithPagination } from '@/core/repositories/data-with-pagination';
import { User } from '@/domain/smart-menu/enterprise/entities/user';

interface ListUsersUseCaseRequest {
  page: number;
  perPage: number;
}

type ListUsersUseCaseResponse = Either<
  null,
  {
    users: DataWithPagination<User>;
  }
>;

@Injectable()
export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    perPage,
  }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ page, perPage });

    return right({ users });
  }
}
