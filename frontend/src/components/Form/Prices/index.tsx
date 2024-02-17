'use client';

import { useCallback, useMemo } from 'react';

import { Price } from './Price';

import { Button, ComboboxItem, Paper, Stack, Text, Title } from '@mantine/core';
import { useEstateFormContext } from '@src/context/formContext';
import { Price as PriceEnum } from '@src/types/enum';

type Props = {
  prices: ComboboxItem[];
};

export const Prices: React.FC<Props> = ({ prices }) => {
  const form = useEstateFormContext();

  const priceSelected = useMemo(() => {
    return form.getInputProps('prices').value as PriceEnum[];
  }, [form]);

  const onAddPrice = useCallback(() => {
    if (priceSelected.length >= 2) return;

    const pricesNotSelected = prices.find(
      ({ value }) => !priceSelected.some((price) => price.type === value)
    );

    if (!pricesNotSelected) return;

    form.setFieldValue('prices', [
      ...priceSelected,
      { value: 0, type: pricesNotSelected.value as PriceEnum['type'] },
    ]);
  }, [form, priceSelected, prices]);

  return (
    <Paper withBorder p="md">
      <Stack>
        <Title order={2} size="h4">
          Preços
          <Text c="gray" size="sm">
            Adicione os preços de aluguel e venda do imóvel
          </Text>
        </Title>
        <Stack align="center" gap="xl">
          <Stack w="100%">
            {priceSelected.map((price, index) => (
              <Price key={index} index={index} price={price} prices={prices} />
            ))}
          </Stack>
          <Button
            w="100%"
            variant="light"
            onClick={onAddPrice}
            disabled={priceSelected.length >= 2}
          >
            Adicionar Preço
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
