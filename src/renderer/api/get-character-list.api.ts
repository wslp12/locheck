/* eslint-disable no-promise-executor-return */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';
import { Character } from '../recoil/character-list.state';

type Id = string;

async function getCharacterList(
  id: Id,
): Promise<Character[] | { statusCode: number; message: string }> {
  const encodeId = encodeURI(id);
  const url = `http://localhost:3000/character-list/${encodeId}`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
}

async function getCharacterListByUserName(
  id: Id,
): Promise<Character[] | { statusCode: number; message: string }> {
  const encodeId = encodeURI(id);
  const url = `http://localhost:3000/character-list/username/${encodeId}`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
}

const useGetCharacterList = (id: Id) => {
  return useQuery([QUERY_KEY.CHARACTER_LIST, id], () => getCharacterList(id), {
    enabled: false,
  });
};

const useGetCharacterList2 = (id: Id) => {
  return useQuery([QUERY_KEY.CHARACTER_LIST, id], () =>
    getCharacterListByUserName(id),
  );
};

export { useGetCharacterList2 };
export default useGetCharacterList;
