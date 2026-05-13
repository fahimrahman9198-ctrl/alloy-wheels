import { z } from 'zod'

const NANP_PHONE = /^\+?1?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(NANP_PHONE, 'Please enter a valid Canadian/US phone number'),
  address: z.string().min(5, 'Please enter a valid address').max(200),
  vehicleMake: z.string().min(1, 'Please select a vehicle make'),
  vehicleModel: z.string().min(1, 'Please select a vehicle model'),
  vehicleYear: z.number().int().min(2000).max(2026),
})

export const quoteContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(NANP_PHONE, 'Please enter a valid Canadian/US phone number'),
  isDealer: z.boolean().default(false),
  dealerName: z.string().optional(),
  dealerContact: z.string().optional(),
  marketingOptIn: z.boolean().default(false),
  smsOptIn: z.boolean().default(false),
}).refine(
  (data) => !data.isDealer || (data.dealerName && data.dealerName.length > 0),
  { message: 'Dealer name is required for trade accounts', path: ['dealerName'] }
)

export type ContactFormData = z.infer<typeof contactSchema>
export type QuoteContactFormData = z.infer<typeof quoteContactSchema>
