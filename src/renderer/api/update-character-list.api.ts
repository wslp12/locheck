/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';
import { Character } from '../recoil/character-list.state';

async function updateCharacterList(
  name: string,
  characterList: Character[],
): Promise<Character[]> {
  const encodeId = encodeURI(name);
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000/character-list/${encodeId}`
      : `http://www.lochek.site:3000/character-list/${encodeId}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(characterList),
  }).then((res) => {
    return res.json();
  });
}

const useUpdateCharacterList = () => {
  return useMutation(
    ({ name, characterList }: { name: string; characterList: Character[] }) =>
      updateCharacterList(name, characterList),
  );
};

export default useUpdateCharacterList;
