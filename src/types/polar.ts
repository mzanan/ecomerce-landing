export interface PolarProduct {
  id: string
  name: string
  description?: string
  prices: PolarPrice[]
}

export interface PolarPrice {
  id: string
  amount: number
  currency: string
  type: 'one_time' | 'recurring'
}

 