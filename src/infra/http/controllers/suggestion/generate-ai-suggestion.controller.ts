import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { GetDishByIdUseCase } from '@/domain/smart-menu/application/use-cases/dish/get-dish-by-id';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DishPresenter } from '../../presenters/dish-presenter';
import { Public } from '@/infra/auth/public';
import { GenerateAISuggestionUseCase } from '@/domain/smart-menu/application/use-cases/ai/generate-ai-suggestion';
import {
  GenerateAISuggestionSchema,
  bodyValidationPipe,
} from './dtos/message-sent.dto';

@Controller('ai/suggestion/:restaurantId')
export class GenerateAISuggestionController {
  constructor(
    private generateAISuggestionUseCase: GenerateAISuggestionUseCase,
  ) {}

  @Post()
  @Public()
  async handle(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body(bodyValidationPipe) body: GenerateAISuggestionSchema,
  ) {
    const { messages } = body;

    const result = await this.generateAISuggestionUseCase.execute({
      messages,
      restaurantId,
    });

    // if (result.isLeft()) {
    //   const error = result.value;

    //   switch (error.constructor) {
    //     case ResourceNotFoundError:
    //       throw new NotFoundException(error.message);

    //     default:
    //       throw new BadRequestException(error.message);
    //   }
    // }

    return {
      message: result,
    };
  }
}
