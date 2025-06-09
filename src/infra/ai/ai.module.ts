import { GenerateDishSuggestion } from '@/domain/smart-menu/application/ai/generate-dish-suggestion';
import { Module } from '@nestjs/common';
import { GenerateGeminiAISuggestion } from './generate-gemini-ai-suggestion';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: GenerateDishSuggestion, useClass: GenerateGeminiAISuggestion },
  ],
  exports: [GenerateDishSuggestion],
})
export class AIModule {}
