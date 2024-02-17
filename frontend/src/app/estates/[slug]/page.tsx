import { Metadata } from 'next';

import { getEstateBySlug, updateEstate } from '@src/app/actions';
import { Form } from '@src/components/Form';
import { EstateDTO } from '@src/types/entities/estate';
import { transformEstateIntoDTO } from '@src/utils/transformEstateIntoDTO';

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { slug },
}: Props): Promise<Metadata> => {
  const estate = await getEstateBySlug(slug);

  return {
    title: estate.name,
    description: estate.description,
  };
};

export default async function Page({ params: { slug } }: Props) {
  const estate = await getEstateBySlug(slug);

  const submit = async (_: EstateDTO, dirty: Partial<EstateDTO>) => {
    'use server';

    const editedEstate = await updateEstate(estate.id, dirty);
    return editedEstate;
  };

  return (
    <Form initialValues={transformEstateIntoDTO(estate)} submit={submit} />
  );
}
