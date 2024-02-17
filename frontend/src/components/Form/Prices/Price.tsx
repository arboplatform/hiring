import { useCallback, useMemo } from 'react';
import { IMaskInput } from 'react-imask';

import { CloseButton, ComboboxItem, Grid, Input, Select } from '@mantine/core';
import { useEstateFormContext } from '@src/context/formContext';
import { Price as PriceEnum } from '@src/types/enum';

type Props = {
  index: number;
  price: PriceEnum;
  prices: ComboboxItem[];
};

export const Price: React.FC<Props> = ({ index, price, prices }) => {
  const form = useEstateFormContext();

  const pricesSelected = useMemo(() => {
    return form.getInputProps('prices').value as PriceEnum[];
  }, [form]);

  const pricesList = useMemo(() => {
    return prices.map((price) => ({
      ...price,
      disabled: pricesSelected.some(({ type }) => type === price.value),
    }));
  }, [prices, pricesSelected]);

  const onRemovePrice = useCallback(() => {
    const otherPrices = pricesSelected.filter(
      ({ type }) => type !== price.type
    );

    form.setFieldValue('prices', otherPrices);
  }, [form, pricesSelected, price.type]);

  return (
    <Grid align="start">
      <Grid.Col span={{ base: 5.5, sm: 5.75 }}>
        <Input.Wrapper
          label="Valor"
          withAsterisk
          {...form.getInputProps(`prices.${index}.value`)}
        >
          <Input
            component={IMaskInput}
            placeholder="10.000.000,00"
            leftSection="R$"
            unmask={true}
            mask={Number}
            // @ts-expect-error
            lazy={false}
            min={0}
            max={10_000_000_000}
            thousandsSeparator="."
            radix=","
            onAccept={(value) => {
              form.setFieldValue(`prices.${index}.value`, Number(value) || '');
            }}
            value={(
              form.getInputProps(`prices.${index}.value`).value ?? ''
            ).toString()}
            error={form.getInputProps(`prices.${index}.value`).error}
          />
        </Input.Wrapper>
      </Grid.Col>
      <Grid.Col span={{ base: 5.5, sm: 5.75 }}>
        <Select
          withAsterisk
          label="Tipo"
          data={pricesList}
          placeholder="Selecione um tipo"
          {...form.getInputProps(`prices.${index}.type`)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 1, sm: 0.5 }}>
        <CloseButton
          disabled={pricesSelected.length === 1}
          onClick={onRemovePrice}
          mt="1.75rem"
        />
      </Grid.Col>
    </Grid>
  );
};
