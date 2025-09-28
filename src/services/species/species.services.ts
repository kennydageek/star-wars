import * as ENDPOINTS from '../endpoints';

export const getSpecies = async () => {
  const response = await fetch(ENDPOINTS.FETCH_SPECIES, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};

export const getSpeciesById = async (id: string) => {
  const response = await fetch(`${ENDPOINTS.FETCH_SPECIES}/${id}`, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};
