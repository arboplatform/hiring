'use client';

import Link from 'next/link';

import { EstateModal } from './Modal';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faEllipsisV,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Estate } from '@src/types/entities';

library.add(faEllipsisV, faEdit, faTrashAlt);

type Props = {
  estate: Estate;
};

export const Interactions: React.FC<Props> = ({ estate }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <EstateModal opened={opened} close={close} estate={estate} />

      <Menu shadow="md" position="bottom-end">
        <Menu.Target>
          <Button variant="transparent" color="dark">
            <FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            href={`/estates/${estate.slug}`}
            leftSection={<FontAwesomeIcon icon={['fas', 'edit']} size="sm" />}
          >
            Editar
          </Menu.Item>
          <Menu.Item
            onClick={open}
            color="red"
            leftSection={
              <FontAwesomeIcon icon={['fas', 'trash-alt']} size="sm" />
            }
          >
            Deletar
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
