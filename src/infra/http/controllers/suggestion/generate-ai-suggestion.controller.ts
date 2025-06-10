import { GenerateAISuggestionUseCase } from '@/domain/smart-menu/application/use-cases/ai/generate-ai-suggestion'
import { Public } from '@/infra/auth/public'
import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import {
  GenerateAISuggestionSchema,
  bodyValidationPipe,
} from './dtos/message-sent.dto'

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
    const { messages } = body

    const result = await this.generateAISuggestionUseCase.execute({
      messages,
      restaurantId,
    })

    return {
      message: result,
    }
  }
}
