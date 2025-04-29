import { DataWithPagination } from '@/core/repositories/data-with-pagination';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Address } from '../../enterprise/entities/address';

export abstract class AddressesRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<DataWithPagination<Address>>;

  abstract findById(id: string): Promise<Address | null>;
  abstract findByCEP(cep: string): Promise<Address | null>;
  abstract create(address: Address): Promise<void>;
  abstract save(address: Address): Promise<void>;
  abstract delete(address: Address): Promise<void>;
}
