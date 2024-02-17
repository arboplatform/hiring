import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

async function main() {
  const estateTypesData = [
    {
      id: new ObjectId().toString(),
      name: 'Apartamento',
    },
    {
      id: new ObjectId().toString(),
      name: 'Casa',
    },
    {
      id: new ObjectId().toString(),
      name: 'Sobrado',
    },
    {
      id: new ObjectId().toString(),
      name: 'Terreno',
    },
  ];

  const featureCategoriesData = [
    {
      id: new ObjectId().toString(),
      name: 'Geral',
    },
    {
      id: new ObjectId().toString(),
      name: 'Comodidades do imóvel',
    },
    {
      id: new ObjectId().toString(),
      name: 'Comodidades do condomínio',
    },
  ];

  const featuresData = [
    {
      id: new ObjectId().toString(),
      name: 'Area útil',
      singular: 'útil',
      plural: 'úteis',
      unit: 'm²',
      categoryId: featureCategoriesData[0].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Area total',
      singular: 'total',
      plural: 'totais',
      unit: 'm²',
      categoryId: featureCategoriesData[0].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Quartos',
      singular: 'quarto',
      plural: 'quartos',
      categoryId: featureCategoriesData[0].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Banheiros',
      singular: 'banheiro',
      plural: 'banheiros',
      categoryId: featureCategoriesData[0].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Vagas de garagem',
      singular: 'vaga',
      plural: 'vagas',
      categoryId: featureCategoriesData[0].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Elevador',
      singular: 'elevador',
      plural: 'elevadores',
      categoryId: featureCategoriesData[1].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Armários embutidos',
      singular: 'armário embutido',
      plural: 'armários embutidos',
      categoryId: featureCategoriesData[1].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Piscina',
      singular: 'piscina',
      plural: 'piscinas',
      categoryId: featureCategoriesData[2].id,
    },
    {
      id: new ObjectId().toString(),
      name: 'Salão de festas',
      singular: 'salão de festas',
      plural: 'salões de festas',
      categoryId: featureCategoriesData[2].id,
    },
  ];

  // const estateTypeFeaturesData = [
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[0].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[1].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[2].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[3].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[4].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[5].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[6].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[7].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[0].id,
  //     featureId: featuresData[8].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[0].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[1].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[2].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[3].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[4].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[6].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[1].id,
  //     featureId: featuresData[7].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[0].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[1].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[2].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[3].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[4].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[5].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[2].id,
  //     featureId: featuresData[6].id,
  //   },
  //   {
  //     estateTypeId: estateTypesData[3].id,
  //     featureId: featuresData[0].id,
  //     required: true,
  //   },
  //   {
  //     estateTypeId: estateTypesData[3].id,
  //     featureId: featuresData[1].id,
  //     required: true,
  //   },
  // ];

  await prisma.estateType.createMany({
    data: estateTypesData,
  });

  await prisma.featureCategory.createMany({
    data: featureCategoriesData,
  });

  await prisma.feature.createMany({
    data: featuresData,
  });

  // await prisma.estateTypeFeature.createMany({
  //   data: estateTypeFeaturesData,
  // });

  await prisma.agency.create({
    data: {
      name: 'Imobiliária Lopes',
      description:
        'A melhor imobiliária do Brasil, com mais de 50 anos de experiência no mercado.',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
