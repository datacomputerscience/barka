/**
 * Barka Delivery Provider Abstraction
 * Designed for Tunisian delivery providers
 */

export type DeliveryZone = {
  governorate: string
  cities?: string[]
  fee: number
  estimated_days: number
}

export type ShipmentStatus = 
  | 'pending'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned'
  | 'cancelled'

export type Shipment = {
  id: string
  order_id: string
  provider: string
  tracking_number: string | null
  status: ShipmentStatus
  recipient_name: string
  recipient_phone: string
  governorate: string
  city: string
  address: string
  cod_amount: number
  delivery_fee: number
  provider_response: Record<string, any> | null
  created_at: string
  updated_at: string
}

export type DeliveryFeeCalculation = {
  governorate: string
  city: string
  weight?: number
  cod_amount?: number
}

export interface DeliveryProvider {
  name: string
  displayName: string
  createShipment(order: any): Promise<{ tracking_number: string; response: any }>
  getShipment(tracking_number: string): Promise<Shipment>
  trackShipment(tracking_number: string): Promise<{ status: ShipmentStatus; history: any[] }>
  cancelShipment(tracking_number: string): Promise<boolean>
  calculateDeliveryFee(params: DeliveryFeeCalculation): Promise<number>
  validateCredentials(credentials: Record<string, string>): Promise<boolean>
}

/**
 * Mock provider for development - implements real interface without external API calls
 */
export class MockDeliveryProvider implements DeliveryProvider {
  name = 'mock'
  displayName = 'Mock Provider (Development)'

  async createShipment(order: any) {
    await new Promise(r => setTimeout(r, 500))
    return {
      tracking_number: `MOCK-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      response: { mock: true, order_id: order.id, created_at: new Date().toISOString() }
    }
  }

  async getShipment(tracking_number: string): Promise<Shipment> {
    return {
      id: 'mock-id',
      order_id: 'mock-order',
      provider: 'mock',
      tracking_number,
      status: 'in_transit',
      recipient_name: 'Test Customer',
      recipient_phone: '+216 00 000 000',
      governorate: 'Tunis',
      city: 'Tunis',
      address: 'Test address',
      cod_amount: 100,
      delivery_fee: 8,
      provider_response: { mock: true },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  async trackShipment(tracking_number: string) {
    return {
      status: 'in_transit' as ShipmentStatus,
      history: [
        { status: 'pending', timestamp: new Date(Date.now() - 86400000).toISOString(), location: 'Warehouse' },
        { status: 'picked_up', timestamp: new Date(Date.now() - 43200000).toISOString(), location: 'Tunis Hub' },
        { status: 'in_transit', timestamp: new Date().toISOString(), location: 'En route to destination' },
      ]
    }
  }

  async cancelShipment(_tracking_number: string) {
    return true
  }

  async calculateDeliveryFee(params: DeliveryFeeCalculation) {
    const baseFees: Record<string, number> = {
      'Tunis': 7,
      'Ariana': 7,
      'Ben Arous': 7,
      'Manouba': 7.5,
      'Nabeul': 8,
      'Bizerte': 8.5,
      'Sousse': 8,
      'Sfax': 9,
      'default': 10
    }
    return baseFees[params.governorate] || baseFees.default
  }

  async validateCredentials(_credentials: Record<string, string>) {
    return true
  }
}

/**
 * Registry for Tunisian providers - real implementations require API docs & credentials
 */
export const TUNISIAN_PROVIDERS = [
  { id: 'mock', name: 'Mock Provider (Dev)', description: 'For development and testing', requiresCredentials: false },
  { id: 'mescolis', name: 'MesColis', description: 'Tunisian delivery - requires API credentials', requiresCredentials: true, docsUrl: 'https://mescolis.tn' },
  { id: 'aramex', name: 'Aramex Tunisia', description: 'International & local - requires API credentials', requiresCredentials: true, docsUrl: 'https://www.aramex.com' },
  { id: 'first_delivery', name: 'First Delivery', description: 'Tunisian delivery - requires API credentials', requiresCredentials: true },
  { id: 'best_delivery', name: 'Best Delivery', description: 'Tunisian delivery - requires API credentials', requiresCredentials: true },
  { id: 'navex', name: 'Navex', description: 'Tunisian logistics - requires API credentials', requiresCredentials: true },
  { id: 'intigo', name: 'INTIGO', description: 'Tunisian delivery platform - requires API credentials', requiresCredentials: true, docsUrl: 'https://intigo.tn' },
]

export function getDeliveryProvider(providerId: string): DeliveryProvider {
  // In production, this would instantiate real providers with credentials from secure storage
  // For now, all providers return Mock implementation with warning
  if (providerId !== 'mock') {
    console.warn(`Provider ${providerId} requires real API credentials. Using MockDeliveryProvider. See docs for integration.`)
  }
  return new MockDeliveryProvider()
}
