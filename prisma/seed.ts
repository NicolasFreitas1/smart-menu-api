import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const address = await prisma.address.create({
    data: {
      cep: '12345678',
      city: 'restaurant-test',
      country: 'restaurant-test',
      state: 'restaurant-test',
      street: 'restaurant-test',
      number: 'S/N',
    },
  })
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'restaurant-test',
      addressId: address.id,
    },
  })

  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      name: 'admin',
      password: await hash('user123', 8),
      isAdmin: true,
      restaurantId: restaurant.id,
    },
  })
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
