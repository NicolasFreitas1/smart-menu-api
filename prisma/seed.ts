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
      name: 'Moltalccino',
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

  await prisma.dish.createMany({
    data: [
      {
        name: 'Lasanha',
        description: 'Deliciosa lasanha caseira com molho de tomate e queijo.',
        price: 25.0,
        restaurantId: restaurant.id,
      },
      {
        name: 'Picanha Grelhada',
        description: 'Picanha suculenta grelhada no ponto perfeito.',
        price: 45.0,
        restaurantId: restaurant.id,
      },
      {
        name: 'Salada Caesar',
        description: 'Clássica salada Caesar com frango e parmesão.',
        price: 18.0,
        restaurantId: restaurant.id,
      },
      {
        name: 'Petit Gateau',
        description: 'Bolo de chocolate com recheio cremoso e sorvete.',
        price: 22.0,
        restaurantId: restaurant.id,
      },
      {
        name: 'Spaghetti à Bolonhesa',
        description: 'Massa com molho de carne moída ao estilo italiano.',
        price: 23.0,
        restaurantId: restaurant.id,
      },
    ],
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
