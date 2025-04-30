import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const editAccountBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
})

export type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)
