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

  // Categorias novas e antigas
  const categoryNames = [
    'Massas',
    'Carnes',
    'Saladas',
    'Sobremesas',
    'Bebidas',
    'Vegano',
    'Petiscos',
    'Entrada',
    'Prato Principal',
  ]

  await prisma.category.createMany({
    data: categoryNames.map((name) => ({ name })),
  })

  const allCategories = await prisma.category.findMany({
    where: {
      name: { in: categoryNames },
    },
  })

  // Pratos expandidos
  const dishesData = [
    {
      name: 'Lasanha',
      description: 'Deliciosa lasanha caseira com molho de tomate e queijo.',
      price: 25.0,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Spaghetti à Bolonhesa',
      description: 'Massa com molho de carne moída ao estilo italiano.',
      price: 23.0,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Fettuccine Alfredo',
      description: 'Massa ao molho cremoso de parmesão e manteiga.',
      price: 27.0,
      categories: ['Massas', 'Prato Principal'],
    },

    {
      name: 'Picanha Grelhada',
      description: 'Picanha suculenta grelhada no ponto perfeito.',
      price: 45.0,
      categories: ['Carnes', 'Prato Principal'],
    },
    {
      name: 'Filé Mignon ao Molho Madeira',
      description: 'Filé mignon com molho madeira e champignon.',
      price: 50.0,
      categories: ['Carnes', 'Prato Principal'],
    },
    {
      name: 'Costela Barbecue',
      description: 'Costela assada com molho barbecue caseiro.',
      price: 55.0,
      categories: ['Carnes', 'Prato Principal'],
    },

    {
      name: 'Salada Caesar',
      description: 'Clássica salada Caesar com frango e parmesão.',
      price: 18.0,
      categories: ['Saladas', 'Entrada'],
    },
    {
      name: 'Salada Caprese',
      description: 'Tomate, mussarela de búfala e manjericão.',
      price: 20.0,
      categories: ['Saladas', 'Entrada'],
    },
    {
      name: 'Salada Verde',
      description: 'Mix de folhas verdes frescas com vinagrete.',
      price: 15.0,
      categories: ['Saladas', 'Entrada'],
    },

    {
      name: 'Petit Gateau',
      description: 'Bolo de chocolate com recheio cremoso e sorvete.',
      price: 22.0,
      categories: ['Sobremesas'],
    },
    {
      name: 'Pudim de Leite',
      description: 'Pudim clássico com calda de caramelo.',
      price: 18.0,
      categories: ['Sobremesas'],
    },
    {
      name: 'Tiramisu',
      description: 'Sobremesa italiana de café e mascarpone.',
      price: 25.0,
      categories: ['Sobremesas'],
    },

    {
      name: 'Suco de Laranja',
      description: 'Suco natural de laranja gelado.',
      price: 8.0,
      categories: ['Bebidas'],
    },
    {
      name: 'Refrigerante',
      description: 'Refrigerante gelado em lata.',
      price: 7.0,
      categories: ['Bebidas'],
    },
    {
      name: 'Cerveja Artesanal',
      description: 'Cerveja artesanal gelada.',
      price: 15.0,
      categories: ['Bebidas'],
    },

    {
      name: 'Hambúrguer Vegano',
      description: 'Hambúrguer feito com proteína vegetal.',
      price: 30.0,
      categories: ['Vegano', 'Prato Principal'],
    },
    {
      name: 'Salada de Quinoa',
      description: 'Quinoa com legumes frescos e temperos.',
      price: 25.0,
      categories: ['Vegano', 'Entrada'],
    },
    {
      name: 'Burger de Grão-de-bico',
      description: 'Delicioso burger feito com grão-de-bico.',
      price: 28.0,
      categories: ['Vegano', 'Prato Principal'],
    },

    {
      name: 'Bolinho de Bacalhau',
      description: 'Petisco tradicional de bacalhau.',
      price: 20.0,
      categories: ['Petiscos', 'Entrada'],
    },
    {
      name: 'Batata Frita',
      description: 'Porção de batata frita crocante.',
      price: 15.0,
      categories: ['Petiscos', 'Entrada'],
    },
    {
      name: 'Coxinha',
      description: 'Coxinha de frango bem recheada.',
      price: 18.0,
      categories: ['Petiscos', 'Entrada'],
    },
  ]

  for (const dishData of dishesData) {
    await prisma.dish.create({
      data: {
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        restaurantId: restaurant.id,
        categories: {
          create: dishData.categories.map((catName) => {
            const category = allCategories.find((c) => c.name === catName)
            if (!category)
              throw new Error(`Categoria ${catName} não encontrada`)
            return { categoryId: category.id }
          }),
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
