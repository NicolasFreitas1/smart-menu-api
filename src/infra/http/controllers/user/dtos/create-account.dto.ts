import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
  restaurantId: z.string().min(1),
})

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)
