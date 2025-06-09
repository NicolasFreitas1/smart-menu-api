import { gemini } from '@/infra/ai/models/gemini';
import { Injectable } from '@nestjs/common';
import { generateText, tool } from 'ai';
import { DishesRepository } from '../../repositories/dishes-repository';
import { z } from 'zod';
import { PrismaDishMapper } from '@/infra/database/prisma/mappers/prisma-dish-mapper';
import {
  GenerateDishSuggestion,
  MessageSent,
} from '../../ai/generate-dish-suggestion';

interface GenerateAISuggestionUseCaseRequest {
  restaurantId: string;
  messages: MessageSent[];
}

@Injectable()
export class GenerateAISuggestionUseCase {
  constructor(private generateDishSuggestion: GenerateDishSuggestion) {}

  async execute({
    messages,
    restaurantId,
  }: GenerateAISuggestionUseCaseRequest) {
    const answer = await this.generateDishSuggestion.generate({
      messages,
      restaurantId,
    });

    return answer;
  }
}
