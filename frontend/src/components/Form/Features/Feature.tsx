import { useCallback, useMemo } from 'react';

import {
  CloseButton,
  ComboboxItem,
  Grid,
  NumberInput,
  Select,
  Switch,
} from '@mantine/core';
import { useEstateFormContext } from '@src/context/formContext';
import { FeatureDTO } from '@src/types/entities/estate';

type Props = {
  features: ComboboxItem[];
  feature: FeatureDTO;
  index: number;
};

export const Feature: React.FC<Props> = ({ features, feature, index }) => {
  const form = useEstateFormContext();

  const featuresSelected = useMemo(() => {
    return form.getInputProps('features').value as FeatureDTO[];
  }, [form]);

  const featuresList = useMemo(() => {
    return features.map((feature) => ({
      ...feature,
      disabled: featuresSelected.some(
        (featureSelected) => featureSelected.featureId === feature.value
      ),
    }));
  }, [features, featuresSelected]);

  const onRemoveFeature = useCallback(() => {
    const otherFeatures = featuresSelected.filter(
      ({ featureId }) => featureId !== feature.featureId
    );

    form.setFieldValue('features', otherFeatures);
  }, [form, featuresSelected, feature.featureId]);

  return (
    <Grid align="start">
      <Grid.Col span={{ base: (12 - 1) / 3, sm: 'auto' }}>
        <Select
          withAsterisk
          label="Característica"
          data={featuresList}
          placeholder="Selecione uma característica"
          {...form.getInputProps(`features.${index}.featureId`)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: (12 - 1) / 3, sm: 'auto' }}>
        <NumberInput
          label="Quantidade"
          placeholder="Quantidade"
          min={1}
          {...form.getInputProps(`features.${index}.amount`)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: (12 - 1) / 3, sm: 'content' }}>
        <Switch
          styles={{ body: { margin: '0 auto' } }}
          display="flex"
          mt="1.75rem"
          size="md"
          onLabel="Sim"
          offLabel="Não"
          label="Mostrar Quantidade"
          labelPosition="left"
          {...form.getInputProps(`features.${index}.showAmount`, {
            type: 'checkbox',
          })}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 1, sm: 0.5 }}>
        <CloseButton mt="1.75rem" onClick={onRemoveFeature} />
      </Grid.Col>
    </Grid>
  );
};
