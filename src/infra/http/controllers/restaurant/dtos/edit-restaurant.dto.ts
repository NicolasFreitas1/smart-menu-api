import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const editRestaurantBodySchema = z.object({
  name: z.string().min(1),
})

export type EditRestaurantBodySchema = z.infer<typeof editRestaurantBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(
  editRestaurantBodySchema,
)
