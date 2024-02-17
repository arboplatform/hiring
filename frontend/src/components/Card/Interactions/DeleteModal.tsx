import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group, LoadingOverlay, Modal, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { deleteEstate } from '@src/app/actions';
import { Estate } from '@src/types/entities';

library.add(faCheck, faExclamationTriangle);

type Props = {
  estate: Estate;
  opened: boolean;
  close: () => void;
};

export const DeleteModal: React.FC<Props> = ({
  close,
  opened,
  estate: { name, id },
}) => {
  const [visible, { toggle }] = useDisclosure(false);

  const handleDelete = async () => {
    toggle();

    const notificationId = notifications.show({
      loading: true,
      title: 'Deletando o imóvel',
      message:
        'Estamos deletando o imóvel do servidor, por favor, aguarde um momento.',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await deleteEstate(id);

      notifications.update({
        id: notificationId,
        color: 'teal',
        title: 'Imóvel deletado',
        message: 'O imóvel foi deletado com sucesso.',
        icon: (
          <FontAwesomeIcon
            icon={['fas', 'check']}
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        loading: false,
        autoClose: 2000,
      });

      close();
    } catch (error) {
      console.error(error);

      notifications.update({
        id: notificationId,
        color: 'red',
        title: 'Erro ao deletar o imóvel',
        message:
          (error as Error).message ||
          'Ocorreu um erro ao deletar o imóvel, tente novamente.',
        icon: (
          <FontAwesomeIcon
            icon={['fas', 'exclamation-triangle']}
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        loading: false,
        autoClose: 2000,
      });

      close();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Deletar imóvel"
      pos="relative"
      overlayProps={{
        blur: 2,
      }}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Group gap="md" w="100%">
        <Text>
          Você tem certeza que deseja deletar o imóvel &quot;{name}&quot;?
        </Text>
        <Group justify="space-between" w="100%">
          <Button variant="light" onClick={close}>
            Cancelar
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={handleDelete}
            leftSection={
              <FontAwesomeIcon icon={['fas', 'trash-alt']} size="sm" />
            }
          >
            Deletar
          </Button>
        </Group>
      </Group>
    </Modal>
  );
};
