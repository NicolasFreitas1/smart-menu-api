# 📚 Exemplos de Uso da API

Este documento contém exemplos práticos de como usar a Smart Menu API, incluindo requisições, respostas e cenários comuns.

## 🔐 Autenticação

### Login de Usuário

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@restaurante.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "admin@restaurante.com",
    "isAdmin": true,
    "restaurantId": "550e8400-e29b-41d4-a716-446655440001"
  }
}
```

### Cadastro de Usuário

```bash
POST /auth/register
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@restaurante.com",
  "password": "senha123",
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001"
}
```

## 🏪 Gestão de Restaurantes

### Criar Restaurante

```bash
POST /restaurants
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Restaurante Italiano",
  "address": {
    "cep": "01234-567",
    "street": "Rua das Flores",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil"
  }
}
```

**Resposta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Restaurante Italiano",
  "address": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "cep": "01234-567",
    "street": "Rua das Flores",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Listar Restaurantes

```bash
GET /restaurants?page=1&perPage=10
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "restaurants": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Restaurante Italiano",
      "address": {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "cep": "01234-567",
        "street": "Rua das Flores",
        "number": "123",
        "city": "São Paulo",
        "state": "SP",
        "country": "Brasil"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Listar Restaurantes com Endereços (Novo)

```bash
GET /restaurants/with-address?page=1&perPage=10
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "restaurants": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Restaurante Italiano",
      "address": {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "cep": "01234-567",
        "street": "Rua das Flores",
        "number": "123",
        "city": "São Paulo",
        "state": "SP",
        "country": "Brasil"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Buscar Restaurante por ID com Endereço (Novo)

```bash
GET /restaurants/550e8400-e29b-41d4-a716-446655440001/with-address
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Restaurante Italiano",
  "address": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "cep": "01234-567",
    "street": "Rua das Flores",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## 🍽️ Gestão de Pratos

### Criar Prato

```bash
POST /dishes
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Espaguete à Bolonhesa",
  "description": "Espaguete com molho de carne moída e tomate",
  "price": 25.90,
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001",
  "categoryIds": ["550e8400-e29b-41d4-a716-446655440003"]
}
```

**Resposta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440004",
  "name": "Espaguete à Bolonhesa",
  "description": "Espaguete com molho de carne moída e tomate",
  "price": 25.9,
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001",
  "categories": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Massas"
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Listar Pratos por Restaurante

```bash
GET /dishes/restaurant/550e8400-e29b-41d4-a716-446655440001?page=1&perPage=10
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "dishes": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "name": "Espaguete à Bolonhesa",
      "description": "Espaguete com molho de carne moída e tomate",
      "price": 25.9,
      "categories": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440003",
          "name": "Massas"
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Prato Aleatório

```bash
GET /dishes/random/550e8400-e29b-41d4-a716-446655440001
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440004",
  "name": "Espaguete à Bolonhesa",
  "description": "Espaguete com molho de carne moída e tomate",
  "price": 25.9,
  "categories": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Massas"
    }
  ]
}
```

## 📋 Sistema de Pedidos

### Criar Pedido com Itens

```bash
POST /orders/with-items
Content-Type: application/json
Authorization: Bearer <token>

{
  "tableNumber": 5,
  "observations": "Sem cebola, por favor",
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001",
  "items": [
    {
      "dishId": "550e8400-e29b-41d4-a716-446655440004",
      "quantity": 2
    },
    {
      "dishId": "550e8400-e29b-41d4-a716-446655440005",
      "quantity": 1
    }
  ]
}
```

**Resposta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440006",
  "tableNumber": 5,
  "observations": "Sem cebola, por favor",
  "status": "PENDING",
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001",
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440007",
      "dish": {
        "id": "550e8400-e29b-41d4-a716-446655440004",
        "name": "Espaguete à Bolonhesa",
        "price": 25.9
      },
      "quantity": 2
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440008",
      "dish": {
        "id": "550e8400-e29b-41d4-a716-446655440005",
        "name": "Tiramisu",
        "price": 15.9
      },
      "quantity": 1
    }
  ],
  "total": 67.7,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Listar Pedidos

```bash
GET /orders?page=1&perPage=10&status=PENDING
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "orders": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440006",
      "tableNumber": 5,
      "observations": "Sem cebola, por favor",
      "status": "PENDING",
      "restaurantId": "550e8400-e29b-41d4-a716-446655440001",
      "items": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440007",
          "dish": {
            "id": "550e8400-e29b-41d4-a716-446655440004",
            "name": "Espaguete à Bolonhesa",
            "price": 25.9
          },
          "quantity": 2
        }
      ],
      "total": 67.7,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## 🤖 Inteligência Artificial

### Gerar Sugestão de Prato

```bash
POST /suggestions/ai
Content-Type: application/json
Authorization: Bearer <token>

{
  "message": "Estou com fome de algo italiano e quero algo leve",
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Resposta:**

```json
{
  "suggestion": "Com base no seu pedido, recomendo o Risoto de Funghi. É um prato italiano tradicional feito com arroz arbóreo, cogumelos frescos, queijo parmesão e um toque de manteiga. É leve, saboroso e perfeito para quem busca uma opção italiana mais suave. O prato custa R$ 32,90 e é servido com uma guarnição de legumes grelhados.",
  "recommendedDish": {
    "id": "550e8400-e29b-41d4-a716-446655440009",
    "name": "Risoto de Funghi",
    "description": "Risoto cremoso com cogumelos frescos",
    "price": 32.9
  }
}
```

## 👥 Gestão de Usuários

### Editar Perfil

```bash
PUT /users/profile
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "João Silva Santos",
  "email": "joao.silva@restaurante.com"
}
```

**Resposta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva Santos",
  "email": "joao.silva@restaurante.com",
  "isAdmin": true,
  "restaurantId": "550e8400-e29b-41d4-a716-446655440001",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Alterar Senha

```bash
PUT /users/password
Content-Type: application/json
Authorization: Bearer <token>

{
  "currentPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

**Resposta:**

```json
{
  "message": "Senha alterada com sucesso"
}
```

## 📊 Categorias

### Listar Categorias

```bash
GET /categories
Authorization: Bearer <token>
```

**Resposta:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "Massas"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "name": "Sobremesas"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440011",
    "name": "Bebidas"
  }
]
```

## 🔍 Filtros e Paginação

### Parâmetros de Paginação

- `page`: Número da página (padrão: 1)
- `perPage`: Itens por página (padrão: 10, máximo: 100)

### Filtros por Status (Pedidos)

- `PENDING`: Pendente
- `IN_PROGRESS`: Em Progresso
- `DELIVERED`: Entregue
- `CANCELED`: Cancelado

### Exemplo com Filtros

```bash
GET /orders?page=1&perPage=20&status=IN_PROGRESS
Authorization: Bearer <token>
```

## ⚠️ Tratamento de Erros

### Erro de Validação

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email deve ser um email válido"
    }
  ]
}
```

### Erro de Autenticação

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### Erro de Recurso Não Encontrado

```json
{
  "statusCode": 404,
  "message": "Restaurante não encontrado"
}
```

### Erro de Permissão

```json
{
  "statusCode": 403,
  "message": "Acesso negado. Apenas administradores podem realizar esta ação."
}
```

## 🧪 Testando com cURL

### Exemplo de Login

```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@restaurante.com",
    "password": "senha123"
  }'
```

### Exemplo de Criação de Prato

```bash
curl -X POST http://localhost:3333/dishes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "name": "Pizza Margherita",
    "description": "Pizza tradicional com molho de tomate, mussarela e manjericão",
    "price": 35.90,
    "restaurantId": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

## 📱 Headers Importantes

- `Authorization: Bearer <token>` - Para endpoints protegidos
- `Content-Type: application/json` - Para requisições com corpo JSON
- `Accept: application/json` - Para especificar formato de resposta

## 🔄 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação
- `401` - Não autorizado
- `403` - Acesso negado
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor
