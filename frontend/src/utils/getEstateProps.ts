import { IconName } from '@fortawesome/fontawesome-svg-core';
import { DefaultMantineColor } from '@mantine/core';
import { Estate } from '@src/types/entities';

type FeatureProps = {
  key: string;
  icon: IconName;
  text: string;
};

type EstateProps = {
  active: {
    color: DefaultMantineColor;
    text: string;
  };
  type: {
    color: DefaultMantineColor;
    text: string;
  };
  featuresToShow: FeatureProps[];
  moreFeatures: number;
  prices: {
    rent?: number;
    sale?: number;
  };
  address: string;
  createdText: string;
  updatedText: string;
};

// TODO: add these in database
const icons: { [key: string]: IconName } = {
  '65c16ef1cd3c172e39838f8f': 'maximize',
  '65c16ef1cd3c172e39838f90': 'maximize',
  '65c16ef1cd3c172e39838f91': 'bed',
  '65c16ef1cd3c172e39838f92': 'toilet-paper',
  '65c16ef1cd3c172e39838f93': 'car',
  '65c16ef1cd3c172e39838f94': 'elevator',
  '65c16ef1cd3c172e39838f95': 'box',
  '65c16ef1cd3c172e39838f96': 'water-ladder',
  '65c16ef1cd3c172e39838f97': 'champagne-glasses',
};

const typeColors: { [key: string]: DefaultMantineColor } = {
  '65c16ef1cd3c172e39838f88': 'blue',
  '65c16ef1cd3c172e39838f89': 'cyan',
  '65c16ef1cd3c172e39838f8a': 'violet',
  '65c16ef1cd3c172e39838f8b': 'grape',
};

export const getEstateProps = ({
  type,
  address,
  active,
  prices,
  ...estate
}: Estate): EstateProps => {
  const MAX_FEATURES = 3;

  const activeColor = active ? 'green' : 'red';
  const activeText = active ? 'Ativo' : 'Inativo';

  const features = estate.features.map(({ showAmount, amount, feature }) => {
    const { plural, singular, unit } = feature;

    const title = amount > 1 ? plural : singular;
    const text = showAmount
      ? unit
        ? `${amount}${unit} ${title}`
        : `${amount} ${title}`
      : title;

    return {
      key: feature.id,
      icon: icons[feature.id],
      text,
    };
  });

  const featuresToShow = features.slice(0, MAX_FEATURES);
  const moreFeatures =
    features.length - MAX_FEATURES > 0 ? features.length - MAX_FEATURES : 0;

  const addressText = `${address.street}, ${address.number} em ${address.city} - ${address.state}`;

  const rent = prices.find((price) => price.type === 'RENT');
  const sale = prices.find((price) => price.type === 'SALE');

  const createdDate = new Date(estate.createdAt).toLocaleDateString('pt-BR');
  const createdTime = new Date(estate.createdAt)
    .toLocaleTimeString('pt-BR')
    .split(' ')[0];

  const createdText = `Criado em ${createdDate} às ${createdTime}`;

  const updatedDate = new Date(estate.updatedAt).toLocaleDateString('pt-BR');
  const updatedTime = new Date(estate.updatedAt)
    .toLocaleTimeString('pt-BR')
    .split(' ')[0];

  const updatedText = `Atualizado em ${updatedDate} às ${updatedTime}`;

  return {
    active: {
      color: activeColor,
      text: activeText,
    },
    type: {
      color: typeColors[type.id],
      text: type.name,
    },
    featuresToShow,
    moreFeatures,
    address: addressText,
    prices: {
      rent: rent?.value,
      sale: sale?.value,
    },
    createdText,
    updatedText,
  };
};
