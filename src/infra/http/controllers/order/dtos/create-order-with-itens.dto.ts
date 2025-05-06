import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createOrderItensSchema = z.object({
  dishId: z.string().uuid(),
  quantity: z.number(),
})

const createOrderWithItensBodySchema = z.object({
  costumerId: z.string().uuid().nullish(),
  observations: z.string().nullish(),
  tableNumber: z.number().nullish(),
  restaurantId: z.string().uuid(),
  orderItens: z.array(createOrderItensSchema),
})

export type CreateOrderWithItensBodySchema = z.infer<
  typeof createOrderWithItensBodySchema
>

export const bodyValidationPipe = new ZodValidationPipe(
  createOrderWithItensBodySchema,
)
