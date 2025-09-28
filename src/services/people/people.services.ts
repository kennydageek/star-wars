import * as ENDPOINTS from '../endpoints';

export const getPeople = async () => {
  const response = await fetch(ENDPOINTS.FETCH_PEOPLE, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};

export const getPeopleById = async (id: string) => {
  const response = await fetch(`${ENDPOINTS.FETCH_PEOPLE}/${id}`, {
    method: 'GET',
    headers: {},
  });

  return response.json();
};
