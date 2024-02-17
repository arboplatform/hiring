import { getAgencies, getEstateTypes, getFeatures } from '../actions';

import { Container } from '@mantine/core';
import { RelationsProvider } from '@src/context/RelationsContext';
import { transformIntoComboboxItem } from '@src/utils/transformIntoComboboxItem';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { nodes: agencies } = await getAgencies();
  const { nodes: types } = await getEstateTypes();
  const { nodes: features } = await getFeatures();

  const agenciesProps = transformIntoComboboxItem(agencies);
  const typesProps = transformIntoComboboxItem(types);
  const featuresProps = transformIntoComboboxItem(features);

  const relations = {
    agencies: agenciesProps,
    types: typesProps,
    features: featuresProps,
  };

  return (
    <RelationsProvider {...relations}>
      <Container>{children}</Container>
    </RelationsProvider>
  );
}
