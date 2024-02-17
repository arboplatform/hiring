import { z } from 'zod';

import { createFormContext } from '@mantine/form';
import { EstateDTO, FeatureDTO } from '@src/types/entities/estate';
import { Price } from '@src/types/enum';

export const [EstateFormProvider, useEstateFormContext, useEstateForm] =
  createFormContext<EstateDTO>();

const checkIfFeatureIsUnique = z.custom<FeatureDTO[]>(
  (features) => {
    const featuresTyped = features as FeatureDTO[];

    const featureQuantity = featuresTyped.reduce((acc, feature) => {
      acc[feature.featureId] = (acc[feature.featureId] || 0) + 1;
      return acc;
    }, {} as Record<FeatureDTO['featureId'], number>);

    return Object.values(featureQuantity).every((quantity) => quantity === 1);
  },
  {
    message: 'A característica deve ser única',
    path: [0, 'featureId'],
  }
);

const onlyOneRentOrSale = z.custom<Price[]>(
  (prices) => {
    const pricesTyped = prices as Price[];

    const typeQuantity = pricesTyped.reduce((acc, price) => {
      acc[price.type] = (acc[price.type] || 0) + 1;
      return acc;
    }, {} as Record<Price['type'], number>);

    return Object.values(typeQuantity).every((quantity) => quantity === 1);
  },
  {
    message: 'Deve haver apenas um preço de venda e um de aluguel',
    path: [0, 'type'],
  }
);

export const schema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatória' })
    .min(1, { message: 'O título é obrigatório' }),
  description: z
    .string({ required_error: 'A descrição é obrigatória' })
    .min(1, { message: 'A descrição é obrigatória' }),
  agencyId: z
    .string({
      required_error: 'A imobiliária é obrigatória',
      invalid_type_error: 'Selecione uma imobiliária válida',
    })
    .min(1, { message: 'A imobiliária é obrigatória' }),
  typeId: z
    .string({
      required_error: 'O tipo é obrigatório',
      invalid_type_error: 'Selecione um tipo de imóvel válido',
    })
    .min(1, { message: 'O tipo é obrigatório' }),
  address: z.object({
    street: z
      .string({ required_error: 'A rua é obrigatória' })
      .min(1, { message: 'A rua é obrigatória' }),
    number: z
      .number({
        required_error: 'O número é obrigatória',
        invalid_type_error: 'Digite um número válido',
      })
      .positive({ message: 'O número deve ser maior que 0' }),
    city: z
      .string({ required_error: 'A cidade é obrigatória' })
      .min(1, { message: 'A cidade é obrigatória' }),
    state: z
      .string({ required_error: 'O estado é obrigatório' })
      .min(1, { message: 'O estado é obrigatório' }),
    zip: z
      .string({ required_error: 'O CEP é obrigatório' })
      .regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' }),
  }),
  prices: z
    .array(
      z.object({
        type: z.enum(['RENT', 'SALE'], {
          required_error: 'O tipo é obrigatório',
          invalid_type_error: 'Selecione um tipo válido',
        }),
        value: z
          .number({
            required_error: 'O preço é obrigatório',
            invalid_type_error: 'Digite um preço válido',
          })
          .positive({ message: 'O preço deve ser maior que 0' }),
      })
    )
    .min(1, { message: 'O preço é obrigatório' })
    .max(2, {
      message: 'Deve haver no máximo 2 preços',
    })
    .and(onlyOneRentOrSale),
  features: z
    .array(
      z.object({
        featureId: z
          .string({
            required_error: 'A característica é obrigatória',
            invalid_type_error: 'Selecione uma característica valida',
          })
          .min(1, { message: 'A característica é obrigatória' }),
        amount: z
          .number({
            required_error: 'A quantidade é obrigatória',
            invalid_type_error: 'Digite uma quantidade válida',
          })
          .positive({ message: 'A quantidade deve ser maior que 0' }),
        showAmount: z.boolean({
          required_error: 'A exibição da quantidade é obrigatória',
          invalid_type_error: 'Selecione uma opção válida',
        }),
      })
    )
    .and(checkIfFeatureIsUnique),
});
