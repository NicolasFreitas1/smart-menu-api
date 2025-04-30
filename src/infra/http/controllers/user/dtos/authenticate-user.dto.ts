import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const authenticateUserBodySchema = z.object({
  email: z.string().min(1).email(),
  password: z.string(),
})

export type AuthenticateUserBodySchema = z.infer<
  typeof authenticateUserBodySchema
>

export const bodyValidationPipe = new ZodValidationPipe(
  authenticateUserBodySchema,
)
