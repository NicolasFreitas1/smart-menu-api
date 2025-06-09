import { User } from '@/domain/smart-menu/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      restaurantId: user.restaurantId.toString(),
      createdAt: user.createdAt,
    }
  }
}
