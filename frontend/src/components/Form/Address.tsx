import { IMaskInput } from 'react-imask';

import {
  Grid,
  Input,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useEstateFormContext } from '@src/context/formContext';

export const Address: React.FC = () => {
  const form = useEstateFormContext();

  return (
    <Paper withBorder p="md">
      <Stack>
        <Title order={2} size="h4">
          Endereço
          <Text c="gray" size="sm">
            Informe o endereço do imóvel
          </Text>
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <TextInput
              withAsterisk
              label="País"
              placeholder="País do imóvel"
              value="Brasil"
              disabled
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <TextInput
              withAsterisk
              label="Estado"
              placeholder="Estado do imóvel"
              {...form.getInputProps('address.state')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Input.Wrapper
              withAsterisk
              label="CEP"
              {...form.getInputProps('address.zip')}
            >
              <Input
                component={IMaskInput}
                mask="00000-000"
                placeholder="12345-567"
                {...form.getInputProps('address.zip')}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <TextInput
              withAsterisk
              label="Cidade"
              placeholder="Cidade do imóvel"
              {...form.getInputProps('address.city')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              withAsterisk
              label="Rua"
              placeholder="Rua do imóvel"
              {...form.getInputProps('address.street')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <NumberInput
              withAsterisk
              label="Número"
              min={1}
              {...form.getInputProps('address.number')}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
};
