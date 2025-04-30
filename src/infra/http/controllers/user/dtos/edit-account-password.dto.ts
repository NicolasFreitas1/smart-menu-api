import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const editAccountPasswordBodySchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
})

export type EditAccountPasswordBodySchema = z.infer<
  typeof editAccountPasswordBodySchema
>

export const bodyValidationPipe = new ZodValidationPipe(
  editAccountPasswordBodySchema,
)
