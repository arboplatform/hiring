import { Interactions } from './Interactions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Card,
  Divider,
  Group,
  List,
  ListItem,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Estate } from '@src/types/entities';
import { getEstateProps } from '@src/utils/getEstateProps';

type Props = {
  estate: Estate;
};

export const EstateCard: React.FC<Props> = ({ estate }) => {
  const { name, agency } = estate;

  const {
    active,
    type,
    moreFeatures,
    featuresToShow,
    address,
    prices: { rent, sale },
    createdText,
    updatedText,
  } = getEstateProps(estate);

  return (
    <Card component="section" withBorder radius="md">
      <Group component="header" mb="md" justify="space-between" wrap="nowrap">
        <Group gap="md" wrap="nowrap">
          <Title size="h3" lineClamp={1}>
            {name}
          </Title>
          <Group gap="sm" wrap="nowrap">
            <Badge variant="light" color={active.color}>
              {active.text}
            </Badge>
            <Badge variant="light" color={type.color}>
              {type.text}
            </Badge>
          </Group>
        </Group>

        <Interactions estate={estate} />
      </Group>

      <Group align="flex-start">
        <Stack gap="md" flex="1 1 60%" miw={0}>
          <Group component={List} gap="md">
            <ListItem icon={<FontAwesomeIcon icon="building" />} m={0}>
              <Text truncate size="sm">
                {agency.name}
              </Text>
            </ListItem>
            <ListItem
              icon={<FontAwesomeIcon icon="map-marker-alt" />}
              m={0}
              miw={0}
              styles={{
                itemWrapper: { width: '100%' },
                itemLabel: { width: '100%', minWidth: 0 },
              }}
            >
              <Text truncate size="sm">
                {address}
              </Text>
            </ListItem>
          </Group>

          <Group component={List} gap="md">
            {featuresToShow.map(({ icon, key, text }) => (
              <ListItem
                key={key}
                icon={<FontAwesomeIcon icon={['fas', icon]} size="sm" />}
                m={0}
                miw={0}
                styles={{
                  itemWrapper: { width: '100%' },
                  itemLabel: { width: '100%', minWidth: 0 },
                }}
              >
                <Text truncate size="sm">
                  {text}
                </Text>
              </ListItem>
            ))}
            {moreFeatures && (
              <ListItem icon={<FontAwesomeIcon icon="ellipsis-h" />} m={0}>
                <Text size="sm">+{moreFeatures}</Text>
              </ListItem>
            )}
          </Group>
        </Stack>

        <Stack gap="md" flex="1 1 25%" miw={0} style={{ textAlign: 'right' }}>
          {rent && (
            <Text truncate="start">
              Aluguel:{' '}
              <NumberFormatter prefix="R$ " value={rent} thousandSeparator />
            </Text>
          )}
          {sale && (
            <Text truncate="start">
              Venda:{' '}
              <NumberFormatter prefix="R$ " value={sale} thousandSeparator />
            </Text>
          )}
        </Stack>
      </Group>

      <Divider my="md" />

      <Group gap="md" component="footer">
        <Text size="sm" c="gray">
          {createdText}
        </Text>
        <Divider orientation="vertical" />
        <Text size="sm" c="gray">
          {updatedText}
        </Text>
      </Group>
    </Card>
  );
};
