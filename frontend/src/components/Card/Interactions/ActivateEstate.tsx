import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group, LoadingOverlay, Modal, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { updateEstate } from '@src/app/actions';
import { Estate } from '@src/types/entities';

library.add(faCheck, faExclamationTriangle);

type Props = {
  estate: Estate;
  opened: boolean;
  close: () => void;
};

export const ActivateEstate: React.FC<Props> = ({ close, opened, estate }) => {
  const [visible, { open, close: closeLoading }] = useDisclosure(false);

  const handleActivate = async () => {
    open();

    const notificationId = notifications.show({
      loading: true,
      title: `${estate.active ? 'Desativando' : 'Ativando'} o imóvel`,
      message: `Estamos ${
        estate.active ? 'desativando' : 'ativando'
      } o imóvel no servidor, por favor, aguarde um momento.`,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await updateEstate(estate.id, { active: !estate.active });

      notifications.update({
        id: notificationId,
        color: 'teal',
        title: `Imóvel ${estate.active ? 'desativado' : 'ativado'}`,
        message: `O imóvel foi ${
          estate.active ? 'desativado' : 'ativado'
        } com sucesso.`,
        icon: (
          <FontAwesomeIcon
            icon={['fas', 'check']}
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        loading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);

      notifications.update({
        id: notificationId,
        color: 'red',
        title: `Erro ao ${estate.active ? 'desativar' : 'ativar'} o imóvel`,
        message:
          (error as Error).message ||
          `Ocorreu um erro ao ${
            estate.active ? 'desativar' : 'ativar'
          } o imóvel, por favor, tente novamente.`,
        icon: (
          <FontAwesomeIcon
            icon={['fas', 'exclamation-triangle']}
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        loading: false,
        autoClose: 2000,
      });
    } finally {
      close();
      closeLoading();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={estate.active ? 'Desativar imóvel' : 'Ativar imóvel'}
      pos="relative"
      overlayProps={{ blur: 2 }}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Group gap="md" w="100%">
        <Text>
          Você tem certeza que deseja {estate.active ? 'desativar' : 'ativar'} o
          imóvel &quot;{estate.name}&quot;?
        </Text>
        <Group justify="space-between" w="100%">
          <Button variant="light" onClick={close}>
            Cancelar
          </Button>
          <Button
            variant="light"
            color={estate.active ? 'red' : 'green'}
            onClick={handleActivate}
            leftSection={
              <FontAwesomeIcon icon={['fas', 'power-off']} size="sm" />
            }
          >
            {estate.active ? 'Desativar' : 'Ativar'}
          </Button>
        </Group>
      </Group>
    </Modal>
  );
};
