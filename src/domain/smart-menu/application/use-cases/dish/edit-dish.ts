import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { DishCategoriesRepository } from '../../repositories/dish-categories-repository'
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'
import { Category } from '@/domain/smart-menu/enterprise/entities/category'
import { DishCategory } from '@/domain/smart-menu/enterprise/entities/dish-category'

interface EditDishUseCaseRequest {
  dishId: string
  name: string
  description: string
  price: number
  categories: string[]
}

type EditDishUseCaseResponse = Either<
  ResourceNotFoundError | EmailAlreadyInUseError,
  {
    dish: Dish
  }
>

@Injectable()
export class EditDishUseCase {
  constructor(
    private dishesRepository: DishesRepository,
    private categoriesRepository: CategoriesRepository,
    private dishCategoriesRepository: DishCategoriesRepository,
  ) {}

  async execute({
    name,
    dishId,
    description,
    price,
    categories,
  }: EditDishUseCaseRequest): Promise<EditDishUseCaseResponse> {
    const dish = await this.dishesRepository.findById(dishId)

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    dish.name = name
    dish.description = description
    dish.price = price

    await this.dishesRepository.save(dish)

    await this.dishCategoriesRepository.deleteByDishId(dishId)

    const existingCategories =
      await this.categoriesRepository.findManyByNames(categories)
    const categoryMap = new Map(existingCategories.map((c) => [c.name, c]))

    for (const categoryName of categories) {
      let category = categoryMap.get(categoryName)

      if (!category) {
        category = Category.create({ name: categoryName })
        await this.categoriesRepository.create(category)
        categoryMap.set(categoryName, category)
      }

      const dishCategory = DishCategory.create({
        categoryId: category.id,
        dishId: dish.id,
      })

      await this.dishCategoriesRepository.create(dishCategory)
    }

    return right({ dish })
  }
}
