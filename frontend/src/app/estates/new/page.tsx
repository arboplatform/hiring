import { createEstate } from '@src/app/actions';
import { Form } from '@src/components/Form';
import { EstateDTO } from '@src/types/entities/estate';

export default async function Page() {
  const submit = async (estate: EstateDTO) => {
    'use server';

    const createdEstate = await createEstate(estate);
    return createdEstate;
  };

  const initialValues: EstateDTO = {
    name: '',
    address: {
      city: '',
      number: 0,
      state: '',
      street: '',
      zip: '',
    },
    agencyId: '',
    description: '',
    typeId: '',
    features: [],
    prices: [{ type: 'SALE', value: 0 }],
  };

  return <Form initialValues={initialValues} submit={submit} />;
}
