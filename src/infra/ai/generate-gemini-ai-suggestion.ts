import {
  GenerateDishSuggestion,
  GenerateDishSuggestionRequest,
  GenerateDishSuggestionResponse,
  MessageSent,
} from '@/domain/smart-menu/application/ai/generate-dish-suggestion';
import { Injectable } from '@nestjs/common';
import { generateText, tool } from 'ai';
import { gemini } from './models/gemini';
import { z } from 'zod';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class GenerateGeminiAISuggestion implements GenerateDishSuggestion {
  constructor(private prisma: PrismaService) {}

  async generate({
    messages,
    restaurantId,
  }: GenerateDishSuggestionRequest): Promise<GenerateDishSuggestionResponse> {
    const chatHistory = messages
      .map(
        (msg) =>
          `${msg.role === 'user' ? 'Cliente' : 'Assistente'}: ${msg.content}`,
      )
      .join('\n');

    const answer = await generateText({
      model: gemini,
      prompt: chatHistory,
      tools: {
        dishesFromDatabase: tool({
          description: `
            Realiza uma query no Postgres para buscar informações de pratos e determinar uma sugestão do melhor pedido de acordo com as respostas enviadas.

            Só poderá realizar operações de busca (SELECT), não é permitido a geração de qualquer operação de escrita.


             As buscas devem considerar:
            - O nome do prato (ex: "costela", "espaguete").
            - A descrição do prato (ex: "prato à base de carne bovina").
            - A categoria do prato, **se ajudar**, mas **não é obrigatória**.
            - Palavras-chave extraídas do histórico de mensagens.
            - Atender as necessidades requisitadas.

            Tabelas que ajudarão na tomada de decisão:
            """
            -- Tabela: categories
            CREATE TABLE categories (
              id_category UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              nm_category VARCHAR(250) NOT NULL,
              dt_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              dt_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            -- Tabela: dishes
            CREATE TABLE dishes (
              id_dish UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              nm_dish VARCHAR(250) NOT NULL,
              ds_dish VARCHAR(500) NOT NULL,
              vl_price DOUBLE PRECISION NOT NULL,
              id_restaurant UUID NOT NULL,
              dt_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              dt_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

              CONSTRAINT fk_dish_restaurant FOREIGN KEY (id_restaurant) REFERENCES restaurants(id)
            );

            -- Tabela: dish_categories (tabela de associação)
            CREATE TABLE dish_categories (
              id_dish_category UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              id_dish UUID NOT NULL,
              id_category UUID NOT NULL,
              dt_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              dt_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

              CONSTRAINT fk_dish_category_dish FOREIGN KEY (id_dish) REFERENCES dishes(id_dish) ON DELETE CASCADE,
              CONSTRAINT fk_dish_category_category FOREIGN KEY (id_category) REFERENCES categories(id_category) ON DELETE CASCADE,
              CONSTRAINT unique_dish_category UNIQUE (id_dish, id_category)
            );

            """

            Todas as operações deverão ser filtradas pelo id do restaurante (id_restaurant): ${restaurantId}

            Caso nao exista de acordo com a categoria, pode filtrar pelo nome ou descrição que se encaixe no solicitado.
            
            Não se atente somente ao nome, descrição, e categorias do prato, traga dados que façam sentido 
          `.trim(),
          parameters: z.object({
            query: z
              .string()
              .describe('Query do PostgreSQL para ser executada'),
            params: z
              .array(z.string())
              .optional()
              .describe('Parâmetros da query a ser executada (opcional)'),
          }),
          execute: async ({ query, params }) => {
            console.log('🔍 Query recebida:', query);
            console.log('📝 Parâmetros recebidos:', params || 'Nenhum parâmetro');

            // Por enquanto, vamos usar uma busca simples no Prisma
            // em vez de executar a query SQL diretamente
            const result = await this.prisma.dish.findMany({
              where: { restaurantId },
              include: { categories: { include: { category: true } } },
            });

            console.log(
              '🚀 ~ GenerateGeminiAISuggestion ~ execute: ~ result:',
              result,
            );
            return JSON.stringify(result);
          },
        }),
      },
      system: `
        Você é um assistente gastronômico que sugere pratos com base nas preferências do usuário.
        
        Avalie as mensagens recebidas e gere uma sugestão apropriada.

        Use as ferramentas disponíveis para buscar pratos no banco. Prefira os pratos que mais se alinham com os desejos expressos, considerando palavras-chave no nome e descrição, não apenas as categorias.

        A resposta deve conter um objeto com:
        {
          id: string,
          name: string,
          description: string,
          price: number,
        }

        Apenas um prato por sugestão.
      `.trim(),
      maxSteps: 5,
    });

    return { message: answer.text };
  }
}
