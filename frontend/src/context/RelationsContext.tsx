'use client';

import { createContext, useContext } from 'react';

import { ComboboxItem } from '@mantine/core';

type ContextType = {
  agencies: ComboboxItem[];
  types: ComboboxItem[];
  features: ComboboxItem[];
};

const RelationsContext = createContext<ContextType>({} as ContextType);

type Props = React.PropsWithChildren<{
  agencies: ComboboxItem[];
  types: ComboboxItem[];
  features: ComboboxItem[];
}>;

const RelationsProvider: React.FC<Props> = ({ children, ...relations }) => {
  return (
    <RelationsContext.Provider value={{ ...relations }}>
      {children}
    </RelationsContext.Provider>
  );
};

const useRelations = () => {
  const context = useContext(RelationsContext);

  if (!context) {
    throw new Error(
      'useFormController must be used within a FormControllerProvider'
    );
  }

  return context;
};

export { RelationsProvider, useRelations };
