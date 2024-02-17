import { Estate } from '@src/types/entities';
import { EstateDTO } from '@src/types/entities/estate';

export const transformEstateIntoDTO = (estate: Estate): EstateDTO => ({
  name: estate.name,
  description: estate.description,
  address: {
    city: estate.address.city,
    number: estate.address.number,
    state: estate.address.state,
    street: estate.address.street,
    zip: estate.address.zip,
  },
  prices: estate.prices.map((price) => ({
    value: price.value,
    type: price.type,
  })),
  agencyId: estate.agency.id,
  typeId: estate.type.id,
  features: estate.features.map((feature) => ({
    amount: feature.amount,
    featureId: feature.featureId,
    showAmount: feature.showAmount,
  })),
});
