'use client';

import Link from 'next/link';

import { ActivateEstate } from './ActivateEstate';
import { DeleteModal } from './DeleteModal';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faEllipsisV,
  faPowerOff,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Estate } from '@src/types/entities';

library.add(faEllipsisV, faEdit, faTrashAlt, faPowerOff);

type Props = {
  estate: Estate;
};

export const Interactions: React.FC<Props> = ({ estate }) => {
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [openedActivate, { open: openActivate, close: closeActivate }] =
    useDisclosure(false);

  return (
    <>
      <DeleteModal opened={openedDelete} close={closeDelete} estate={estate} />
      <ActivateEstate
        opened={openedActivate}
        close={closeActivate}
        estate={estate}
      />

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
            onClick={openActivate}
            color={estate.active ? 'red' : 'green'}
            leftSection={
              <FontAwesomeIcon icon={['fas', 'power-off']} size="sm" />
            }
          >
            {estate.active ? 'Desativar' : 'Ativar'}
          </Menu.Item>
          <Menu.Item
            onClick={openDelete}
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
