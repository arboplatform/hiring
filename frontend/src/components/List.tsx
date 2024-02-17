import { EstateCard } from './Card';

import { Stack } from '@mantine/core';
import { getEstates } from '@src/app/actions';

export const EstatesList: React.FC = async () => {
  const { nodes: estates } = await getEstates();

  if (!estates) {
    return <div>No estates found</div>;
  }

  return (
    <Stack component="ul" gap="md" w="100%" p={0} style={{ listStyle: 'none' }}>
      {estates.map((estate) => (
        <li key={estate.id}>
          <EstateCard estate={estate} />
        </li>
      ))}
    </Stack>
  );
};
