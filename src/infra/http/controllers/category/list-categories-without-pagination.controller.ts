import { ListCategoriesWithoutPaginationUseCase } from '@/domain/smart-menu/application/use-cases/category/list-categories-without-pagination'
import { Public } from '@/infra/auth/public'
import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { CategoryPresenter } from '../../presenters/category-presenter'

@Controller('categories')
export class ListCategoriesWithoutPaginationController {
  constructor(
    private listCategoriesWithoutPaginationUseCase: ListCategoriesWithoutPaginationUseCase,
  ) {}

  @Get()
  @Public()
  async handle() {
    const result = await this.listCategoriesWithoutPaginationUseCase.execute()

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }

    const categories = result.value.categories

    return categories.map(CategoryPresenter.toHTTP)
  }
}
