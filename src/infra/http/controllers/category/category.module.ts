import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { ListCategoriesWithoutPaginationController } from './list-categories-without-pagination.controller'
import { ListCategoriesWithoutPaginationUseCase } from '@/domain/smart-menu/application/use-cases/category/list-categories-without-pagination'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [ListCategoriesWithoutPaginationController],
  providers: [ListCategoriesWithoutPaginationUseCase],
})
export class CategoryModule {}
