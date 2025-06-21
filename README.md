# 🍽️ Smart Menu API

[![NestJS](https://img.shields.io/badge/NestJS-10.4.15-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.6.0-green.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Uma API robusta e escalável para gerenciamento de restaurantes, cardápios digitais e pedidos, construída com NestJS, TypeScript e Prisma.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

O **Smart Menu API** é uma solução completa para restaurantes que desejam digitalizar seus processos. A API oferece funcionalidades para gerenciamento de usuários, restaurantes, cardápios, categorias de pratos, pedidos e integração com IA para sugestões personalizadas.

### Principais Características

- 🔐 **Autenticação JWT** com controle de acesso baseado em roles
- 🏪 **Gestão de Restaurantes** com endereços e informações completas
- 🍽️ **Cardápio Digital** com categorias e imagens
- 📝 **Sistema de Pedidos** com status e observações
- 🤖 **Integração com IA** (OpenAI e Google Gemini) para sugestões
- 📊 **Paginação** em todas as listagens
- 🛡️ **Validação robusta** com Zod
- 🐳 **Docker** para desenvolvimento e produção

## ✨ Funcionalidades

### 👥 Gestão de Usuários

- Cadastro e autenticação de usuários
- Controle de acesso (admin/usuário comum)
- Edição de perfil e senha
- Vinculação com restaurantes

### 🏪 Gestão de Restaurantes

- Cadastro de restaurantes com endereços
- Edição de informações
- Listagem com paginação

### 🍽️ Gestão de Cardápio

- Cadastro de pratos com descrições e preços
- Categorização de pratos
- Upload de imagens
- Sugestões aleatórias de pratos

### 📋 Sistema de Pedidos

- Criação de pedidos com múltiplos itens
- Controle de status (Pendente, Em Progresso, Entregue, Cancelado)
- Observações e número da mesa
- Histórico de pedidos por restaurante

### 🤖 Inteligência Artificial

- Sugestões personalizadas de pratos
- Integração com OpenAI e Google Gemini
- Análise de preferências do usuário

## 🛠️ Tecnologias

### Backend

- **[NestJS](https://nestjs.com/)** - Framework Node.js para aplicações escaláveis
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem de programação tipada
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação e autorização
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js/)** - Hash de senhas
- **[Zod](https://zod.dev/)** - Validação de schemas

### IA e Integrações

- **[OpenAI](https://openai.com/)** - API de inteligência artificial
- **[Google Gemini](https://ai.google.dev/)** - Modelo de IA do Google
- **[AI SDK](https://sdk.vercel.ai/)** - SDK para integração com IAs

### Desenvolvimento

- **[Docker](https://www.docker.com/)** - Containerização
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[Jest](https://jestjs.io/)** - Testes unitários e e2e

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**:

```
src/
├── core/           # Camada de domínio compartilhado
├── domain/         # Regras de negócio e entidades
├── infra/          # Implementações de infraestrutura
│   ├── auth/       # Autenticação e autorização
│   ├── database/   # Banco de dados e repositórios
│   ├── http/       # Controllers e middlewares
│   └── ai/         # Integrações com IA
```

### Padrões Utilizados

- **Repository Pattern** - Abstração de acesso a dados
- **Use Case Pattern** - Casos de uso da aplicação
- **DTO Pattern** - Transferência de dados
- **Presenter Pattern** - Formatação de respostas
- **Either Pattern** - Tratamento de erros funcional

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)
- [PostgreSQL](https://www.postgresql.org/) (versão 15 ou superior)
- [Docker](https://www.docker.com/) (opcional, para desenvolvimento)

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd smart-menu-api
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

4. **Configure o banco de dados**

```bash
# Com Docker (recomendado para desenvolvimento)
docker-compose up -d

# Ou configure um PostgreSQL local
```

5. **Execute as migrações**

```bash
pnpm prisma migrate dev
```

6. **Execute o seed (opcional)**

```bash
pnpm prisma db seed
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="postgresql://docker:docker@localhost:5433/smart-menu-db"

# JWT
JWT_PRIVATE_KEY="sua-chave-privada-jwt"
JWT_PUBLIC_KEY="sua-chave-publica-jwt"

# Servidor
PORT=3333

# APIs de IA
OPENAI_API_KEY="sua-chave-openai"
GOOGLE_GENERATIVE_AI_API_KEY="sua-chave-google-gemini"
```

### Configuração do Banco de Dados

O projeto usa PostgreSQL com Prisma. As migrações estão localizadas em `prisma/migrations/`.

## 🏃‍♂️ Uso

### Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
pnpm run start:dev

# Modo debug
pnpm run start:debug
```

### Produção

```bash
# Build da aplicação
pnpm run build

# Execução em produção
pnpm run start:prod
```

### Docker

```bash
# Desenvolvimento com Docker
docker-compose -f docker/development/docker-compose.yml up -d

# Produção
docker-compose up -d
```

### Testes

```bash
# Testes unitários
pnpm run test

# Testes e2e
pnpm run test:e2e

# Cobertura de testes
pnpm run test:cov
```

## 🔌 API Endpoints

### Autenticação

- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Cadastro de usuário

### Usuários

- `GET /users` - Listar usuários (admin)
- `GET /users/profile` - Perfil do usuário logado
- `PUT /users/profile` - Editar perfil
- `PUT /users/password` - Alterar senha
- `DELETE /users/:id` - Deletar usuário (admin)

### Restaurantes

- `GET /restaurants` - Listar restaurantes
- `GET /restaurants/:id` - Buscar restaurante por ID
- `POST /restaurants` - Criar restaurante
- `PUT /restaurants/:id` - Editar restaurante
- `DELETE /restaurants/:id` - Deletar restaurante

### Pratos

- `GET /dishes` - Listar pratos
- `GET /dishes/:id` - Buscar prato por ID
- `GET /dishes/restaurant/:restaurantId` - Pratos por restaurante
- `GET /dishes/random/:restaurantId` - Prato aleatório
- `POST /dishes` - Criar prato
- `PUT /dishes/:id` - Editar prato
- `DELETE /dishes/:id` - Deletar prato

### Categorias

- `GET /categories` - Listar categorias

### Pedidos

- `GET /orders` - Listar pedidos
- `GET /orders/:id` - Buscar pedido por ID
- `POST /orders` - Criar pedido
- `POST /orders/with-items` - Criar pedido com itens
- `DELETE /orders/:id` - Cancelar pedido

### IA

- `POST /suggestions/ai` - Gerar sugestão de prato com IA

## 📁 Estrutura do Projeto

```
smart-menu-api/
├── src/
│   ├── core/                    # Camada de domínio compartilhado
│   │   ├── entities/           # Entidades base
│   │   ├── errors/             # Erros customizados
│   │   ├── repositories/       # Interfaces de repositórios
│   │   └── types/              # Tipos compartilhados
│   ├── domain/                 # Regras de negócio
│   │   └── smart-menu/
│   │       ├── application/    # Casos de uso
│   │       └── enterprise/     # Entidades de domínio
│   └── infra/                  # Implementações de infraestrutura
│       ├── auth/               # Autenticação JWT
│       ├── database/           # Prisma e repositórios
│       ├── http/               # Controllers e middlewares
│       └── ai/                 # Integrações com IA
├── prisma/                     # Schema e migrações do banco
├── docker/                     # Configurações Docker
└── tests/                      # Testes automatizados
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript strict mode
- Siga as convenções do ESLint e Prettier
- Escreva testes para novas funcionalidades
- Documente APIs com Swagger
- Use commits semânticos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email**: [seu-email@exemplo.com]
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/smart-menu-api/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/smart-menu-api/wiki)

---

<div align="center">
  <p>Desenvolvido com ❤️ usando NestJS e TypeScript</p>
  <p>Smart Menu API - Transformando a experiência gastronômica</p>
</div>
