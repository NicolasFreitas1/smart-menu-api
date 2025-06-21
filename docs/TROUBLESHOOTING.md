# 🔧 Guia de Troubleshooting

Este documento contém soluções para problemas comuns que podem ocorrer durante o desenvolvimento e uso da Smart Menu API.

## 🚨 Erros Comuns

### 1. Erro de Validação de IA (AI_InvalidToolArgumentsError)

**Problema:**

```
AI_InvalidToolArgumentsError: Invalid arguments for tool dishesFromDatabase: Type validation failed
```

**Causa:** O schema Zod da ferramenta de IA está esperando campos obrigatórios que não estão sendo enviados.

**Solução:**

- Verifique se todos os campos obrigatórios estão sendo enviados
- Torne campos opcionais quando apropriado usando `.optional()`
- Verifique a documentação da API de IA para entender os parâmetros esperados

**Exemplo de correção:**

```typescript
// Antes (causa erro)
params: z.array(z.string()).describe('Parâmetros da query');

// Depois (corrigido)
params: z.array(z.string())
  .optional()
  .describe('Parâmetros da query (opcional)');
```

### 2. Erro de Conexão com Banco de Dados

**Problema:**

```
Error: connect ECONNREFUSED 127.0.0.1:5433
```

**Causa:** O PostgreSQL não está rodando ou a URL de conexão está incorreta.

**Soluções:**

1. **Verificar se o Docker está rodando:**

```bash
docker ps
```

2. **Iniciar o banco de dados:**

```bash
docker-compose up -d
```

3. **Verificar a URL de conexão no .env:**

```env
DATABASE_URL="postgresql://docker:docker@localhost:5433/smart-menu-db"
```

4. **Testar conexão:**

```bash
pnpm prisma db push
```

### 3. Erro de Migração

**Problema:**

```
Error: P1001: Can't reach database server
```

**Soluções:**

1. **Verificar se o banco está acessível:**

```bash
pnpm prisma migrate status
```

2. **Resetar o banco (desenvolvimento):**

```bash
pnpm prisma migrate reset
```

3. **Aplicar migrações:**

```bash
pnpm prisma migrate dev
```

### 4. Erro de Autenticação JWT

**Problema:**

```
Error: Invalid JWT token
```

**Causa:** Chaves JWT inválidas ou mal configuradas.

**Soluções:**

1. **Gerar novas chaves:**

```bash
# Gerar chave privada
openssl genrsa -out private.pem 2048

# Gerar chave pública
openssl rsa -in private.pem -pubout -out public.pem
```

2. **Configurar no .env:**

```env
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
```

### 5. Erro de Validação Zod

**Problema:**

```
ZodError: Validation failed
```

**Causa:** Dados enviados não correspondem ao schema esperado.

**Soluções:**

1. **Verificar o schema de validação**
2. **Validar os dados enviados**
3. **Usar o pipe de validação corretamente**

**Exemplo:**

```typescript
@Post()
@UsePipes(new ZodValidationPipe(createUserSchema))
async create(@Body() body: CreateUserDto) {
  // ...
}
```

### 6. Erro de Dependências

**Problema:**

```
Cannot find module '@nestjs/...'
```

**Soluções:**

1. **Reinstalar dependências:**

```bash
rm -rf node_modules
pnpm install
```

2. **Limpar cache:**

```bash
pnpm store prune
```

3. **Verificar versões:**

```bash
pnpm list
```

### 7. Erro de Porta em Uso

**Problema:**

```
Error: listen EADDRINUSE: address already in use :::3333
```

**Soluções:**

1. **Encontrar processo usando a porta:**

```bash
# Windows
netstat -ano | findstr :3333

# Linux/Mac
lsof -i :3333
```

2. **Matar o processo:**

```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

3. **Usar porta diferente:**

```env
PORT=3334
```

## 🔍 Debugging

### Logs Detalhados

Para ativar logs mais detalhados:

```typescript
// main.ts
const app = await NestFactory.create(AppModule, {
  logger: ['error', 'warn', 'debug', 'log', 'verbose'],
});
```

### Debug do Prisma

Para ver as queries SQL executadas:

```typescript
// prisma.service.ts
constructor() {
  super({
    log: ['query', 'info', 'warn', 'error'],
  });
}
```

### Debug da IA

Para ver as requisições da IA:

```typescript
// generate-gemini-ai-suggestion.ts
console.log('🔍 Query recebida:', query);
console.log('📝 Parâmetros:', params);
console.log('🏪 Restaurant ID:', restaurantId);
```

## 🧪 Testes

### Executar Testes Específicos

```bash
# Teste específico
pnpm test -- --testNamePattern="CreateUserUseCase"

# Teste com coverage
pnpm test:cov

# Teste em modo watch
pnpm test:watch
```

### Debug de Testes

```bash
# Debug de testes
pnpm test:debug
```

## 🐳 Docker

### Problemas com Docker

**Container não inicia:**

```bash
# Ver logs
docker logs smart-menu-api

# Rebuild
docker-compose build --no-cache

# Restart
docker-compose restart
```

**Volume não sincroniza:**

```bash
# Verificar volumes
docker volume ls

# Limpar volumes
docker volume prune
```

## 📊 Performance

### Problemas de Performance

**Queries lentas:**

1. Verificar índices no banco
2. Usar paginação
3. Otimizar queries com Prisma

**Memory leaks:**

1. Verificar conexões não fechadas
2. Usar connection pooling
3. Monitorar uso de memória

## 🔒 Segurança

### Problemas de Segurança

**CORS errors:**

```typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3000'],
  credentials: true,
});
```

**Rate limiting:**

```typescript
// Implementar rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite por IP
  }),
);
```

## 📞 Suporte

### Informações para Debug

Quando reportar um problema, inclua:

1. **Versão do Node.js:**

```bash
node --version
```

2. **Versão do pnpm:**

```bash
pnpm --version
```

3. **Logs completos do erro**
4. **Configuração do ambiente (.env)**
5. **Passos para reproduzir o problema**

### Recursos Úteis

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Documentação do Zod](https://zod.dev/)
- [Issues do GitHub](https://github.com/seu-usuario/smart-menu-api/issues)

---

Se o problema persistir, abra uma issue no repositório com todas as informações necessárias para debug.
