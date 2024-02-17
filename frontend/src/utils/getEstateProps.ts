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
  'Area útil': 'maximize',
  'Area total': 'maximize',
  Quartos: 'bed',
  Banheiros: 'toilet-paper',
  'Vagas de garagem': 'car',
  Elevador: 'elevator',
  'Armários embutidos': 'box',
  Piscina: 'water-ladder',
  'Salão de festas': 'champagne-glasses',
};

const typeColors: { [key: string]: DefaultMantineColor } = {
  Casa: 'blue',
  Apartamento: 'cyan',
  Sobrado: 'violet',
  Terreno: 'grape',
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
      icon: icons[feature.name],
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
      color: typeColors[type.name],
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
