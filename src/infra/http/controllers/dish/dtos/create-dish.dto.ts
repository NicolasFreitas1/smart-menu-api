import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createDishBodySchema = z.object({
  description: z.string(),
  name: z.string(),
  price: z.number(),
  restaurantId: z.string().uuid(),
  categories: z.array(z.string()),
})

export type CreateDishBodySchema = z.infer<typeof createDishBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createDishBodySchema)
