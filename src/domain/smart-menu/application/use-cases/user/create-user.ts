import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error'
import { User } from '@/domain/smart-menu/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import { RestaurantsRepository } from '../../repositories/restaurants-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CreateUserUseCaseRequest {
  email: string
  name: string
  password: string
  restaurantId: string
}

type CreateUserUseCaseResponse = Either<EmailAlreadyInUseError, { user: User }>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private restaurantsRepository: RestaurantsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
    restaurantId,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new EmailAlreadyInUseError(email))
    }

    const restaurant = await this.restaurantsRepository.findById(restaurantId)

    if (!restaurant) {
      return left(new ResourceNotFoundError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      email,
      name,
      password: hashedPassword,
      restaurantId: restaurant.id,
    })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
