import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const editDishBodySchema = z.object({
  description: z.string(),
  name: z.string(),
  price: z.number(),
})

export type EditDishBodySchema = z.infer<typeof editDishBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editDishBodySchema)
