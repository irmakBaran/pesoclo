import { PaymentApiBridgeSchema } from '@klarna-web-sdk/payment/src/schema'
import type { SdkConfigSchema } from '@klarna-web-sdk/utils/src/schema'
import type { TypeOf } from 'zod'
import { null as zNull, nullable, object, string } from 'zod'

export type SdkConfigSchemaType = TypeOf<typeof SdkConfigSchema>

export const MethodsSchema = {
  // Klarna iframe storage
  getStorageItem: {
    data: object({
      key: string(),
    }),
    response: nullable(string()),
  },
  setStorageItem: {
    data: object({
      key: string(),
      data: string(),
    }),
    response: zNull(),
  },
  removeStorageItem: {
    data: object({
      key: string(),
    }),
    response: zNull(),
  },

  ...PaymentApiBridgeSchema,
}
