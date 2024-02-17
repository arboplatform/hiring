import { Maybe } from '@src/types/core';

export const transformIntoComboboxItem = (
  data: Maybe<{ id: string; name: string }[]>
) =>
  data?.map((item) => ({
    value: item.id,
    label: item.name,
  })) || [];
