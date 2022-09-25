/* eslint-disable no-promise-executor-return */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';

type Id = string;

const getCharacterList = async (id: Id) => {
  const encodeId = encodeURI(id);
  const url = `http://localhost:3000/character-list/${encodeId}`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
};

const useGetCharacterList = (id: Id) => {
  return useQuery([QUERY_KEY.CHRAACTER_LIST], () => getCharacterList(id), {
    enabled: false,
  });
};

export default useGetCharacterList;
