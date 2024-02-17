'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Address } from './Address';
import { Basic } from './Basic';
import { Features } from './Features';
import { Prices } from './Prices';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group, Loader, rem, Stack } from '@mantine/core';
import { zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  EstateFormProvider,
  schema,
  useEstateForm,
} from '@src/context/formContext';
import { useRelations } from '@src/context/RelationsContext';
import { Estate, EstateDTO } from '@src/types/entities/estate';

library.add(faCheck, faExclamationTriangle);

type Submit = (data: EstateDTO, dirty: Partial<EstateDTO>) => Promise<Estate>;

type Props = {
  initialValues: EstateDTO;
  submit: Submit;
};

export const Form: React.FC<Props> = ({ initialValues, submit }) => {
  const [visible, { close, open }] = useDisclosure(false);
  const { agencies, types, features } = useRelations();

  const router = useRouter();

  const prices = [
    { value: 'RENT' as const, label: 'Aluguel' },
    { value: 'SALE' as const, label: 'Venda' },
  ];

  const form = useEstateForm({
    initialValues,
    validate: zodResolver(schema),
  });

  const onSubmit = async (data: EstateDTO) => {
    if (!form.isDirty()) return;
    open();

    const id = notifications.show({
      loading: true,
      title: 'Enviando o imóvel',
      message:
        'Estamos enviando as informações do imóvel para o servidor, por favor, aguarde um momento.',
      autoClose: false,
      withCloseButton: false,
    });

    const dirty = Object.entries(data).reduce(
      (acc, [key, value]) =>
        form.isDirty(key) ? { ...acc, [key]: value } : acc,
      {}
    );

    try {
      await submit(data, dirty);

      notifications.update({
        id,
        color: 'teal',
        title: 'Imóvel enviado com sucesso',
        message:
          'O imóvel foi enviado com sucesso, você será redirecionado para a página inicial.',
        icon: (
          <FontAwesomeIcon
            icon={['fas', 'check']}
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        loading: false,
        autoClose: 2000,
      });

      router.push('/');
    } catch (error) {
      console.error(error);

      notifications.update({
        id,
        color: 'red',
        title: 'Erro ao enviar o imóvel',
        message:
          (error as Error).message ||
          'Ocorreu um erro ao enviar o imóvel, tente novamente.',
        icon: (
          <FontAwesomeIcon
            icon={['fas', 'exclamation-triangle']}
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        loading: false,
        autoClose: false,
        withCloseButton: true,
      });

      close();
    }
  };

  return (
    <EstateFormProvider form={form}>
      <form id="estate-form" onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="xl" mb="xl">
          <Basic agencies={agencies} types={types} />
          <Address />
          <Prices prices={prices} />
          <Features features={features} />

          <Group gap="sm" align="center" justify="center">
            <Button component={Link} href="/" color="red">
              Cancelar
            </Button>
            <Button
              type="submit"
              form="estate-form"
              color="green"
              disabled={visible}
            >
              {visible ? <Loader size="sm" color="blue" /> : 'Salvar'}
            </Button>
          </Group>
        </Stack>
      </form>
    </EstateFormProvider>
  );
};
