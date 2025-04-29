import { PaginationParams } from '@/core/repositories/pagination-params';
import { User } from '../../enterprise/entities/user';
import { DataWithPagination } from '@/core/repositories/data-with-pagination';

export abstract class UsersRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<User>>;

  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract delete(user: User): Promise<void>;
}
