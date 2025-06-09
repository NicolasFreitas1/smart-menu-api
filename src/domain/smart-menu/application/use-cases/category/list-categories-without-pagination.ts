import { Either, right } from '@/core/either'
import { Category } from '@/domain/smart-menu/enterprise/entities/category'
import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '../../repositories/categories-repository'

type ListCategoriesWithoutPaginationUseCaseResponse = Either<
  null,
  { categories: Category[] }
>

@Injectable()
export class ListCategoriesWithoutPaginationUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<ListCategoriesWithoutPaginationUseCaseResponse> {
    const categories =
      await this.categoriesRepository.findManyWithoutPagination()

    return right({ categories })
  }
}
