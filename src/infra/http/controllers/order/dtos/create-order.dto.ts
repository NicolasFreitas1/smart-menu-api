import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createOrderBodySchema = z.object({
  costumerId: z.string().uuid().nullish(),
  observations: z.string().nullish(),
  tableNumber: z.number().nullish(),
  restaurantId: z.string().uuid(),
})

export type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)
