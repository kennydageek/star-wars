import * as ENDPOINTS from '../endpoints';

export const getFilms = async () => {
  const response = await fetch(ENDPOINTS.FETCH_FILMS, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};

export const getFilmsById = async (id: string) => {
  const response = await fetch(`${ENDPOINTS.FETCH_FILMS}/${id}`, {
    method: 'GET',
  });

  return response.json();
};
