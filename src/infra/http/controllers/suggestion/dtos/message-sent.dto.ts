import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

export const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
})

export const generateAISuggestionSchema = z.object({
  messages: z.array(messageSchema).min(1),
})

// Tipagem TypeScript baseada no schema
export type MessageSent = z.infer<typeof messageSchema>
export type GenerateAISuggestionSchema = z.infer<
  typeof generateAISuggestionSchema
>

export const bodyValidationPipe = new ZodValidationPipe(
  generateAISuggestionSchema,
)
