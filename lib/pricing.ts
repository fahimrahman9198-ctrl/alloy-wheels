import {
  BASE_PRICE_PER_WHEEL,
  WHEEL_SIZE_ADJUSTMENT,
  FINISH_ADJUSTMENT,
  SERVICE_FEE,
  DISCOUNT,
  GST_RATE,
} from './constants'

export interface WheelInput {
  position: 'FL' | 'FR' | 'RL' | 'RR'
  severity: number // 0-1
  size: number
  finish: string
}

export interface EstimateOptions {
  wheels: WheelInput[]
  region: string
  serviceType: 'mobile' | 'shop_dropoff'
  isTradeAccount: boolean
  isRepeatCustomer: boolean
}

export interface WheelBreakdown {
  position: string
  basePrice: number
  sizeAdjustment: number
  finishAdjustment: number
  total: number
}

export interface Estimate {
  wheelBreakdowns: WheelBreakdown[]
  subtotalWheels: number
  multiWheelDiscount: number
  tradeAccountDiscount: number
  repeatCustomerDiscount: number
  subtotalAfterDiscounts: number
  serviceFee: number
  subtotalBeforeGST: number
  gst: number
  total: number
  estimatedRange: { low: number; high: number }
  errors: string[]
}

export function getBasePrice(severity: number): number {
  const clamped = Math.max(0, Math.min(1, severity))
  if (clamped <= 0.5) {
    return BASE_PRICE_PER_WHEEL.minimal + (BASE_PRICE_PER_WHEEL.moderate - BASE_PRICE_PER_WHEEL.minimal) * (clamped / 0.5)
  }
  return BASE_PRICE_PER_WHEEL.moderate + (BASE_PRICE_PER_WHEEL.severe - BASE_PRICE_PER_WHEEL.moderate) * ((clamped - 0.5) / 0.5)
}

export function getWheelCost(wheel: WheelInput): WheelBreakdown {
  const basePrice = getBasePrice(wheel.severity)
  const sizeAdjustment = WHEEL_SIZE_ADJUSTMENT[wheel.size] ?? 0
  const finishAdjustment = FINISH_ADJUSTMENT[wheel.finish] ?? 0
  return {
    position: wheel.position,
    basePrice,
    sizeAdjustment,
    finishAdjustment,
    total: basePrice + sizeAdjustment + finishAdjustment,
  }
}

export function calculateEstimate(options: EstimateOptions): Estimate {
  const errors: string[] = []

  if (!options.wheels || options.wheels.length === 0) {
    errors.push('At least one wheel is required.')
  }
  if (!options.region) {
    errors.push('Region is required.')
  }

  if (errors.length > 0) {
    return {
      wheelBreakdowns: [],
      subtotalWheels: 0,
      multiWheelDiscount: 0,
      tradeAccountDiscount: 0,
      repeatCustomerDiscount: 0,
      subtotalAfterDiscounts: 0,
      serviceFee: 0,
      subtotalBeforeGST: 0,
      gst: 0,
      total: 0,
      estimatedRange: { low: 0, high: 0 },
      errors,
    }
  }

  const wheelBreakdowns = options.wheels.map(getWheelCost)
  const subtotalWheels = wheelBreakdowns.reduce((sum, w) => sum + w.total, 0)

  const multiWheelDiscount = options.wheels.length > 1 ? subtotalWheels * DISCOUNT.multi_wheel : 0
  let afterMulti = subtotalWheels - multiWheelDiscount

  const tradeAccountDiscount = options.isTradeAccount ? afterMulti * DISCOUNT.trade_account : 0
  afterMulti -= tradeAccountDiscount

  const repeatCustomerDiscount = options.isRepeatCustomer ? afterMulti * DISCOUNT.repeat_customer : 0
  const subtotalAfterDiscounts = afterMulti - repeatCustomerDiscount

  const serviceFeeKey = options.serviceType === 'shop_dropoff' ? 'shop_dropoff' : options.region
  const serviceFee = SERVICE_FEE[serviceFeeKey] ?? 0

  const subtotalBeforeGST = subtotalAfterDiscounts + serviceFee
  const gst = subtotalBeforeGST * GST_RATE
  const total = subtotalBeforeGST + gst

  // Range: low = all minimal severity, high = all severe severity
  const lowestWheelCost = options.wheels.reduce((sum, w) => {
    const adj = (WHEEL_SIZE_ADJUSTMENT[w.size] ?? 0) + (FINISH_ADJUSTMENT[w.finish] ?? 0)
    return sum + BASE_PRICE_PER_WHEEL.minimal + adj
  }, 0)
  const highestWheelCost = options.wheels.reduce((sum, w) => {
    const adj = (WHEEL_SIZE_ADJUSTMENT[w.size] ?? 0) + (FINISH_ADJUSTMENT[w.finish] ?? 0)
    return sum + BASE_PRICE_PER_WHEEL.severe + adj
  }, 0)

  const calcTotal = (sub: number) => {
    const d1 = options.wheels.length > 1 ? sub * DISCOUNT.multi_wheel : 0
    let a = sub - d1
    if (options.isTradeAccount) a -= a * DISCOUNT.trade_account
    if (options.isRepeatCustomer) a -= a * DISCOUNT.repeat_customer
    const t = a + serviceFee
    return t + t * GST_RATE
  }

  return {
    wheelBreakdowns,
    subtotalWheels,
    multiWheelDiscount,
    tradeAccountDiscount,
    repeatCustomerDiscount,
    subtotalAfterDiscounts,
    serviceFee,
    subtotalBeforeGST,
    gst,
    total,
    estimatedRange: { low: calcTotal(lowestWheelCost), high: calcTotal(highestWheelCost) },
    errors: [],
  }
}
