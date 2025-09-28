import * as ENDPOINTS from '../endpoints';

export const getStarships = async () => {
  const response = await fetch(ENDPOINTS.FETCH_STARSHIPS, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};

export const getStarshipsById = async (id: string) => {
  const response = await fetch(`${ENDPOINTS.FETCH_STARSHIPS}/${id}`, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};
