import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/smart-menu/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        restaurantId: new UniqueEntityId(raw.restaurantId),
        isAdmin: raw.isAdmin,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      restaurantId: user.restaurantId.toString(),
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
    }
  }
}
