import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Dish } from '@/domain/smart-menu/enterprise/entities/dish'
import { Injectable } from '@nestjs/common'
import { DishesRepository } from '../../repositories/dishes-repository'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { DishCategoriesRepository } from '../../repositories/dish-categories-repository'
import { Category } from '@/domain/smart-menu/enterprise/entities/category'
import { DishCategory } from '@/domain/smart-menu/enterprise/entities/dish-category'

interface CreateDishUseCaseRequest {
  name: string
  description: string
  price: number
  restaurantId: string
  categories: string[]
}

type CreateDishUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dish: Dish
  }
>

@Injectable()
export class CreateDishUseCase {
  constructor(
    private dishesRepository: DishesRepository,
    private categoriesRepository: CategoriesRepository,
    private dishCategoriesRepository: DishCategoriesRepository,
    private restaurantsRepository: RestaurantsRepository,
  ) {}

  async execute({
    description,
    name,
    price,
    restaurantId,
    categories,
  }: CreateDishUseCaseRequest): Promise<CreateDishUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    const dish = Dish.create({
      description,
      name,
      price,
      restaurantId: restaurant.id,
    })
    await this.dishesRepository.create(dish)

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
