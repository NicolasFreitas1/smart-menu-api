import { Address } from '@/domain/smart-menu/enterprise/entities/address'

export class AddressPresenter {
  static toHTTP(address: Address) {
    return {
      id: address.id.toString(),
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      country: address.country,
      cep: address.cep,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    }
  }
}
