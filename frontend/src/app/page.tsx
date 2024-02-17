import { Container } from '@mantine/core';
import { EstatesList } from '@src/components/List';

export default async function Home() {
  return (
    <Container>
      <EstatesList />
    </Container>
  );
}
