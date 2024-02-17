import {
  ComboboxItem,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useEstateFormContext } from '@src/context/formContext';

type Props = {
  agencies: ComboboxItem[];
  types: ComboboxItem[];
};

export const Basic: React.FC<Props> = ({ agencies, types }) => {
  const form = useEstateFormContext();

  return (
    <Paper withBorder p="md">
      <Stack>
        <Title order={2} size="h4">
          Informações básicas
          <Text c="gray" size="sm">
            Informe os dados básicos do imóvel
          </Text>
        </Title>
        <Stack>
          <TextInput
            withAsterisk
            label="Título"
            placeholder="O título do imóvel"
            {...form.getInputProps('name')}
          />
          <Textarea
            withAsterisk
            label="Descrição"
            placeholder="Descreva as características do imóvel"
            autosize
            minRows={2}
            maxRows={4}
            {...form.getInputProps('description')}
          />

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              label="Imobiliária"
              placeholder="Selecione a imobiliária do imóvel"
              data={agencies}
              withAsterisk
              {...form.getInputProps('agencyId')}
            />
            <Select
              label="Tipo de imóvel"
              placeholder="Selecione o tipo do imóvel"
              data={types}
              withAsterisk
              {...form.getInputProps('typeId')}
            />
          </SimpleGrid>
        </Stack>
      </Stack>
    </Paper>
  );
};
