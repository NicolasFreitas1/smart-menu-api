import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createAddressSchema = z.object({
  cep: z.string(),
  street: z.string(),
  number: z.string().nullish(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
})

const createRestaurantBodySchema = z.object({
  name: z.string().min(1),
  address: createAddressSchema,
})

export type CreateRestaurantBodySchema = z.infer<
  typeof createRestaurantBodySchema
>

export const bodyValidationPipe = new ZodValidationPipe(
  createRestaurantBodySchema,
)
