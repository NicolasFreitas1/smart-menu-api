import { Either, right } from '@/core/either'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { User } from '@/domain/smart-menu/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { FilterUser } from './filter/filter-user'

interface ListUsersUseCaseRequest {
  page: number
  perPage: number
  filter: FilterUser
}

type ListUsersUseCaseResponse = Either<
  null,
  {
    users: DataWithPagination<User>
  }
>

@Injectable()
export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    perPage,
    filter,
  }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ page, perPage }, filter)

    return right({ users })
  }
}
