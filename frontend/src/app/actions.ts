'use server';

import { revalidateTag } from 'next/cache';

import {
  Agencies,
  Estate,
  Estates,
  EstateTypes,
  Features,
} from '@src/types/entities';
import { EstateDTO } from '@src/types/entities/estate';

const getEstateBySlug = async (slug: string): Promise<Estate> => {
  const res = await fetch(`${process.env.BASE_URL}/estates/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch estate');
  }

  return res.json();
};

const getEstates = async (key = '/estates'): Promise<Estates> => {
  const res = await fetch(`${process.env.BASE_URL}${key}`, {
    next: { revalidate: 60, tags: ['estates'] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch estates');
  }

  return res.json();
};

const deleteEstate = async (id: string): Promise<Estate> => {
  const estate = (await fetch(`${process.env.BASE_URL}/estates/remove/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json())) as Estate;

  revalidateTag('estates');

  return estate;
};

const getEstateTypes = async (): Promise<EstateTypes> => {
  const res = await fetch(`${process.env.BASE_URL}/estate-types`);

  if (!res.ok) {
    throw new Error('Failed to fetch estate types');
  }

  return res.json();
};

const getFeatures = async (): Promise<Features> => {
  const res = await fetch(`${process.env.BASE_URL}/features?active=true`);

  if (!res.ok) {
    throw new Error('Failed to fetch features');
  }

  return res.json();
};

const getAgencies = async (): Promise<Agencies> => {
  const res = await fetch(`${process.env.BASE_URL}/agencies`);

  if (!res.ok) {
    throw new Error('Failed to fetch agencies');
  }

  return res.json();
};

const createEstate = async (estate: EstateDTO): Promise<Estate> => {
  const res = await fetch(`${process.env.BASE_URL}/estates/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(estate),
  });

  if (!res.ok) {
    const error = await res.json();
    const message =
      error.statusCode === 400
        ? error.message
        : 'Não foi possível criar o imóvel';

    throw new Error(message);
  }

  revalidateTag('estates');

  return res.json();
};

const updateEstate = async (
  id: string,
  estate: Partial<EstateDTO>
): Promise<Estate> => {
  const res = await fetch(`${process.env.BASE_URL}/estates/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(estate),
  });

  if (!res.ok) {
    throw new Error('Não foi possível editar o imóvel');
  }

  revalidateTag('estates');

  return res.json();
};

export {
  getEstates,
  getEstateBySlug,
  deleteEstate,
  getEstateTypes,
  getFeatures,
  getAgencies,
  createEstate,
  updateEstate,
};
