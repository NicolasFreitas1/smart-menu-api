import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { GenerateAISuggestionController } from './generate-ai-suggestion.controller';
import { GenerateAISuggestionUseCase } from '@/domain/smart-menu/application/use-cases/ai/generate-ai-suggestion';
import { AIModule } from '@/infra/ai/ai.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, AIModule],
  controllers: [GenerateAISuggestionController],
  providers: [GenerateAISuggestionUseCase],
})
export class SuggestionModule {}
