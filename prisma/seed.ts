import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Limpar dados existentes
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.dishCategory.deleteMany()
  await prisma.dish.deleteMany()
  await prisma.user.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.address.deleteMany()
  await prisma.category.deleteMany()

  // Criar categorias
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
    'Pizzas',
    'Risotos',
    'Sopas',
    'Xis',
    'Lanches',
    'Hambúrgueres',
    'Acompanhamentos',
  ]

  await prisma.category.createMany({
    data: categoryNames.map((name) => ({ name })),
  })

  const allCategories = await prisma.category.findMany()

  // Restaurante 1: Montalccino Pasta Grill
  const address1 = await prisma.address.create({
    data: {
      cep: '88802-210',
      city: 'Criciúma',
      country: 'Brasil',
      state: 'SC',
      street: 'R. Celestina Zili Rovaris',
      number: '238',
    },
  })

  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Montalccino Pasta Grill',
      addressId: address1.id,
    },
  })

  // Usuário admin para o primeiro restaurante
  await prisma.user.create({
    data: {
      email: 'admin@montalccino.com',
      name: 'Chef Giovanni',
      password: await hash('admin123', 8),
      isAdmin: true,
      restaurantId: restaurant1.id,
    },
  })

  // Pratos do Montalccino Pasta Grill
  const dishesData1 = [
    {
      name: 'Lasanha à Bolonhesa Tradicional',
      description: 'Camadas de massa fresca, molho de carne moída, queijo parmesão e molho bechamel gratinado.',
      price: 32.90,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'Massa com ovos, queijo pecorino, pancetta crocante e pimenta preta moída na hora.',
      price: 28.50,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Fettuccine ao Molho de Mariscos',
      description: 'Massa fettuccine com mariscos frescos, alho, tomate cereja e ervas finas.',
      price: 35.90,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Risoto de Funghi Porcini',
      description: 'Arroz arbóreo cremoso com cogumelos porcini, queijo parmesão e manteiga trufada.',
      price: 38.90,
      categories: ['Risotos', 'Prato Principal'],
    },
    {
      name: 'Risoto de Camarão e Açafrão',
      description: 'Risoto cremoso com camarões grelhados e açafrão da terra.',
      price: 42.90,
      categories: ['Risotos', 'Prato Principal'],
    },
    {
      name: 'Bife à Parmegiana',
      description: 'Filé mignon empanado com molho de tomate, mussarela derretida e parmesão.',
      price: 45.90,
      categories: ['Carnes', 'Prato Principal'],
    },
    {
      name: 'Costela no Bafo',
      description: 'Costela bovina assada lentamente com temperos especiais e molho barbecue.',
      price: 48.90,
      categories: ['Carnes', 'Prato Principal'],
    },
    {
      name: 'Salada Caprese',
      description: 'Tomate, mussarela de búfala, manjericão fresco e azeite extra virgem.',
      price: 22.90,
      categories: ['Saladas', 'Entrada'],
    },
    {
      name: 'Salada Caesar com Frango',
      description: 'Alface romana, croutons, parmesão, molho caesar e filé de frango grelhado.',
      price: 25.90,
      categories: ['Saladas', 'Entrada'],
    },
    {
      name: 'Bruschetta de Tomate e Manjericão',
      description: 'Pão italiano torrado com tomate, manjericão, alho e azeite de oliva.',
      price: 18.90,
      categories: ['Petiscos', 'Entrada'],
    },
    {
      name: 'Carpaccio de Carne',
      description: 'Finas fatias de carne crua com rúcula, parmesão e azeite trufado.',
      price: 32.90,
      categories: ['Petiscos', 'Entrada'],
    },
    {
      name: 'Tiramisu Tradicional',
      description: 'Sobremesa italiana com biscoitos embebidos em café, creme de mascarpone e cacau.',
      price: 18.90,
      categories: ['Sobremesas'],
    },
    {
      name: 'Panna Cotta de Frutas Vermelhas',
      description: 'Creme italiano com calda de frutas vermelhas frescas.',
      price: 16.90,
      categories: ['Sobremesas'],
    },
    {
      name: 'Suco de Laranja Natural',
      description: 'Suco de laranja fresco espremido na hora.',
      price: 8.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Água com Gás',
      description: 'Água mineral com gás natural.',
      price: 6.90,
      categories: ['Bebidas'],
    },
  ]

  // Restaurante 2: Cantinho da Massa Restaurante & Pizzaria
  const address2 = await prisma.address.create({
    data: {
      cep: '88815-010',
      city: 'Criciúma',
      country: 'Brasil',
      state: 'SC',
      street: 'Av. Hercílio Amante',
      number: '235',
    },
  })

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Cantinho da Massa Restaurante & Pizzaria',
      addressId: address2.id,
    },
  })

  // Usuário admin para o segundo restaurante
  await prisma.user.create({
    data: {
      email: 'admin@cantinhodamassa.com',
      name: 'Chef Maria',
      password: await hash('admin123', 8),
      isAdmin: true,
      restaurantId: restaurant2.id,
    },
  })

  // Pratos do Cantinho da Massa
  const dishesData2 = [
    {
      name: 'Pizza Margherita',
      description: 'Pizza tradicional com molho de tomate, mussarela fresca e manjericão.',
      price: 29.90,
      categories: ['Pizzas', 'Prato Principal'],
    },
    {
      name: 'Pizza Quatro Queijos',
      description: 'Pizza com mussarela, provolone, parmesão e gorgonzola.',
      price: 34.90,
      categories: ['Pizzas', 'Prato Principal'],
    },
    {
      name: 'Pizza Calabresa',
      description: 'Pizza com calabresa, cebola caramelizada e azeitonas.',
      price: 31.90,
      categories: ['Pizzas', 'Prato Principal'],
    },
    {
      name: 'Pizza Frango com Catupiry',
      description: 'Pizza com filé de frango desfiado e catupiry cremoso.',
      price: 33.90,
      categories: ['Pizzas', 'Prato Principal'],
    },
    {
      name: 'Espaguete à Bolonhesa',
      description: 'Massa com molho de carne moída, tomate e ervas aromáticas.',
      price: 26.90,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Penne ao Molho Branco',
      description: 'Massa penne com molho cremoso de queijo e ervas finas.',
      price: 27.90,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Lasanha de Frango',
      description: 'Lasanha com frango desfiado, milho, catupiry e molho bechamel.',
      price: 30.90,
      categories: ['Massas', 'Prato Principal'],
    },
    {
      name: 'Risoto de Frango',
      description: 'Risoto cremoso com frango grelhado e legumes.',
      price: 28.90,
      categories: ['Risotos', 'Prato Principal'],
    },
    {
      name: 'Risoto de Queijo e Presunto',
      description: 'Risoto com queijo parmesão e presunto defumado.',
      price: 29.90,
      categories: ['Risotos', 'Prato Principal'],
    },
    {
      name: 'Filé de Frango Grelhado',
      description: 'Filé de frango grelhado com molho de ervas e batatas rústicas.',
      price: 32.90,
      categories: ['Carnes', 'Prato Principal'],
    },
    {
      name: 'Bife à Milanesa',
      description: 'Bife empanado com batatas fritas e salada.',
      price: 28.90,
      categories: ['Carnes', 'Prato Principal'],
    },
    {
      name: 'Salada Verde',
      description: 'Mix de folhas verdes com tomate, pepino e vinagrete.',
      price: 18.90,
      categories: ['Saladas', 'Entrada'],
    },
    {
      name: 'Salada de Atum',
      description: 'Salada com atum fresco, ovos, tomate e azeitonas.',
      price: 22.90,
      categories: ['Saladas', 'Entrada'],
    },
    {
      name: 'Sopa de Legumes',
      description: 'Sopa caseira de legumes frescos e ervas.',
      price: 16.90,
      categories: ['Sopas', 'Entrada'],
    },
    {
      name: 'Sopa de Frango',
      description: 'Sopa cremosa de frango com legumes e macarrão.',
      price: 18.90,
      categories: ['Sopas', 'Entrada'],
    },
    {
      name: 'Bolinho de Bacalhau',
      description: 'Petisco tradicional de bacalhau com molho tártaro.',
      price: 24.90,
      categories: ['Petiscos', 'Entrada'],
    },
    {
      name: 'Batata Frita',
      description: 'Porção de batatas fritas crocantes com sal e orégano.',
      price: 16.90,
      categories: ['Petiscos', 'Entrada'],
    },
    {
      name: 'Hambúrguer Vegano',
      description: 'Hambúrguer de grão-de-bico com salada e molho especial.',
      price: 26.90,
      categories: ['Vegano', 'Prato Principal'],
    },
    {
      name: 'Salada de Quinoa',
      description: 'Quinoa com legumes frescos, abacate e molho de limão.',
      price: 24.90,
      categories: ['Vegano', 'Entrada'],
    },
    {
      name: 'Pudim de Leite',
      description: 'Pudim tradicional com calda de caramelo.',
      price: 12.90,
      categories: ['Sobremesas'],
    },
    {
      name: 'Petit Gateau',
      description: 'Bolo de chocolate com recheio cremoso e sorvete de creme.',
      price: 16.90,
      categories: ['Sobremesas'],
    },
    {
      name: 'Refrigerante',
      description: 'Refrigerante gelado em lata.',
      price: 7.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Suco Natural',
      description: 'Suco natural de laranja ou limão.',
      price: 8.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Cerveja',
      description: 'Cerveja gelada em lata.',
      price: 9.90,
      categories: ['Bebidas'],
    },
  ]

  // Restaurante 3: Anselmo Lanches
  const address3 = await prisma.address.create({
    data: {
      cep: '88811-700',
      city: 'Criciúma',
      country: 'Brasil',
      state: 'SC',
      street: 'R. Gen. Osvaldo Pinto da Veiga',
      number: '2121',
    },
  })

  const restaurant3 = await prisma.restaurant.create({
    data: {
      name: 'Anselmo Lanches',
      addressId: address3.id,
    },
  })

  // Usuário admin para o terceiro restaurante
  await prisma.user.create({
    data: {
      email: 'admin@anselmolanches.com',
      name: 'Anselmo',
      password: await hash('admin123', 8),
      isAdmin: true,
      restaurantId: restaurant3.id,
    },
  })

  // Pratos do Anselmo Lanches
  const dishesData3 = [
    {
      name: 'Xis Carne',
      description: 'Pão de hambúrguer com carne, alface, tomate, cebola, queijo e maionese.',
      price: 18.90,
      categories: ['Xis', 'Lanches'],
    },
    {
      name: 'Xis Frango',
      description: 'Pão de hambúrguer com filé de frango, alface, tomate, cebola, queijo e maionese.',
      price: 17.90,
      categories: ['Xis', 'Lanches'],
    },
    {
      name: 'Xis Calabresa',
      description: 'Pão de hambúrguer com calabresa, alface, tomate, cebola, queijo e maionese.',
      price: 19.90,
      categories: ['Xis', 'Lanches'],
    },
    {
      name: 'Xis Bacon',
      description: 'Pão de hambúrguer com carne, bacon crocante, alface, tomate, cebola, queijo e maionese.',
      price: 22.90,
      categories: ['Xis', 'Lanches'],
    },
    {
      name: 'Xis X-Tudo',
      description: 'Pão de hambúrguer com carne, presunto, queijo, ovo, alface, tomate, cebola, milho e maionese.',
      price: 24.90,
      categories: ['Xis', 'Lanches'],
    },
    {
      name: 'Xis Vegetariano',
      description: 'Pão de hambúrguer com hambúrguer de soja, alface, tomate, cebola, queijo e maionese.',
      price: 20.90,
      categories: ['Xis', 'Lanches', 'Vegano'],
    },
    {
      name: 'Hambúrguer Clássico',
      description: 'Pão de hambúrguer com carne, alface, tomate, cebola, queijo e molho especial.',
      price: 16.90,
      categories: ['Hambúrgueres', 'Lanches'],
    },
    {
      name: 'Hambúrguer Duplo',
      description: 'Pão de hambúrguer com duas carnes, alface, tomate, cebola, queijo e molho especial.',
      price: 21.90,
      categories: ['Hambúrgueres', 'Lanches'],
    },
    {
      name: 'Hambúrguer de Frango',
      description: 'Pão de hambúrguer com filé de frango, alface, tomate, cebola, queijo e molho especial.',
      price: 15.90,
      categories: ['Hambúrgueres', 'Lanches'],
    },
    {
      name: 'Cachorro Quente',
      description: 'Pão de cachorro quente com salsicha, purê de batata, milho, ervilha, queijo ralado e molhos.',
      price: 12.90,
      categories: ['Lanches'],
    },
    {
      name: 'Cachorro Quente Duplo',
      description: 'Pão de cachorro quente com duas salsichas, purê de batata, milho, ervilha, queijo ralado e molhos.',
      price: 16.90,
      categories: ['Lanches'],
    },
    {
      name: 'Misto Quente',
      description: 'Pão de forma com presunto, queijo e manteiga.',
      price: 8.90,
      categories: ['Lanches'],
    },
    {
      name: 'Misto Quente Especial',
      description: 'Pão de forma com presunto, queijo, tomate e orégano.',
      price: 10.90,
      categories: ['Lanches'],
    },
    {
      name: 'Batata Frita',
      description: 'Porção de batatas fritas crocantes com sal.',
      price: 12.90,
      categories: ['Acompanhamentos', 'Petiscos'],
    },
    {
      name: 'Batata Frita com Cheddar',
      description: 'Porção de batatas fritas com queijo cheddar derretido e bacon.',
      price: 18.90,
      categories: ['Acompanhamentos', 'Petiscos'],
    },
    {
      name: 'Onion Rings',
      description: 'Porção de anéis de cebola empanados e fritos.',
      price: 14.90,
      categories: ['Acompanhamentos', 'Petiscos'],
    },
    {
      name: 'Nuggets de Frango',
      description: 'Porção de nuggets de frango empanados com molho barbecue.',
      price: 16.90,
      categories: ['Acompanhamentos', 'Petiscos'],
    },
    {
      name: 'Salada de Alface',
      description: 'Salada simples de alface com tomate e vinagrete.',
      price: 8.90,
      categories: ['Saladas', 'Acompanhamentos'],
    },
    {
      name: 'Refrigerante',
      description: 'Refrigerante gelado em lata.',
      price: 6.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Suco de Laranja',
      description: 'Suco de laranja natural.',
      price: 7.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Cerveja',
      description: 'Cerveja gelada em lata.',
      price: 8.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Água',
      description: 'Água mineral sem gás.',
      price: 4.90,
      categories: ['Bebidas'],
    },
    {
      name: 'Sorvete de Chocolate',
      description: 'Sorvete de chocolate em casquinha.',
      price: 8.90,
      categories: ['Sobremesas'],
    },
    {
      name: 'Sorvete de Baunilha',
      description: 'Sorvete de baunilha em casquinha.',
      price: 8.90,
      categories: ['Sobremesas'],
    },
    {
      name: 'Milk Shake de Chocolate',
      description: 'Milk shake cremoso de chocolate.',
      price: 12.90,
      categories: ['Sobremesas', 'Bebidas'],
    },
    {
      name: 'Milk Shake de Morango',
      description: 'Milk shake cremoso de morango.',
      price: 12.90,
      categories: ['Sobremesas', 'Bebidas'],
    },
  ]

  // Criar pratos para o primeiro restaurante
  for (const dishData of dishesData1) {
    await prisma.dish.create({
      data: {
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        restaurantId: restaurant1.id,
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

  // Criar pratos para o segundo restaurante
  for (const dishData of dishesData2) {
    await prisma.dish.create({
      data: {
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        restaurantId: restaurant2.id,
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

  // Criar pratos para o terceiro restaurante
  for (const dishData of dishesData3) {
    await prisma.dish.create({
      data: {
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        restaurantId: restaurant3.id,
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

  console.log('✅ Seed concluído com sucesso!')
  console.log('🍝 Restaurantes criados:')
  console.log('   - Montalccino Pasta Grill (Criciúma - SC)')
  console.log('   - Cantinho da Massa Restaurante & Pizzaria (Criciúma - SC)')
  console.log('   - Anselmo Lanches (Criciúma - SC)')
  console.log('👨‍🍳 Usuários admin:')
  console.log('   - admin@montalccino.com / admin123')
  console.log('   - admin@cantinhodamassa.com / admin123')
  console.log('   - admin@anselmolanches.com / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
