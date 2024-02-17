import { Bebas_Neue as BebasNeue } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTreeCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppShellHeader, Button, Group, Title } from '@mantine/core';

library.add(faTreeCity);

const bebasNeue = BebasNeue({
  subsets: ['latin'],
  weight: ['400'],
});

const ManageButton: React.FC = () => {
  return (
    <Group gap="sm" align="center">
      <Button component={Link} href="/" color="red">
        Cancelar
      </Button>
      <Button type="submit" form="estate-form" color="green">
        Salvar
      </Button>
    </Group>
  );
};

const SideButton: React.FC = () => {
  return (
    <Button component={Link} href="/estates/new">
      Novo Imóvel
    </Button>
  );
};

export const Header: React.FC = () => {
  const path = usePathname();

  return (
    <AppShellHeader>
      <Group h="100%" px="md" justify="space-between">
        <Button variant="transparent" component={Link} href="/">
          <Group gap="xs" align="center">
            <FontAwesomeIcon icon={['fas', 'tree-city']} size="2xl" />
            <Title className={bebasNeue.className} mt={4}>
              Imóveis
            </Title>
          </Group>
        </Button>

        {path.includes('/estates') ? <ManageButton /> : <SideButton />}
      </Group>
    </AppShellHeader>
  );
};
