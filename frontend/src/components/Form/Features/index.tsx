'use client';

import { useCallback, useMemo } from 'react';

import { Feature } from './Feature';

import { Button, ComboboxItem, Paper, Stack, Text, Title } from '@mantine/core';
import { useEstateFormContext } from '@src/context/formContext';
import { FeatureDTO } from '@src/types/entities/estate';

type Props = {
  features: ComboboxItem[];
};

export const Features: React.FC<Props> = ({ features }) => {
  const form = useEstateFormContext();

  const featuresSelected = useMemo(() => {
    return form.getInputProps('features').value as FeatureDTO[];
  }, [form]);

  const onAddFeature = useCallback(() => {
    if (featuresSelected.length >= features.length) return;

    const featureNotSelected = features.find(
      ({ value }) =>
        !featuresSelected.some((feature) => feature.featureId === value)
    );

    if (!featureNotSelected) return;

    form.setFieldValue('features', [
      ...featuresSelected,
      {
        amount: 0,
        featureId: featureNotSelected.value,
        showAmount: true,
      },
    ]);
  }, [form, features, featuresSelected]);

  return (
    <Paper withBorder p="md">
      <Stack>
        <Title order={2} size="h4">
          Características
          <Text c="gray" size="sm">
            Adicione as características do imóvel
          </Text>
        </Title>
        <Stack align="center" gap="xl">
          <Stack w="100%">
            {featuresSelected.length ? (
              featuresSelected.map((feature, index) => (
                <Feature
                  key={index}
                  features={features}
                  feature={feature}
                  index={index}
                />
              ))
            ) : (
              <Text mx="auto" c="gray">
                Nenhuma característica adicionada
              </Text>
            )}
          </Stack>
          <Button
            w="100%"
            variant="light"
            onClick={onAddFeature}
            disabled={featuresSelected.length >= features.length}
          >
            Adicionar Característica
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
