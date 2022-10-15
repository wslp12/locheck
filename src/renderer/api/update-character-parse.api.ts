/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';
import { Character } from '../recoil/character-list.state';

async function updateCharacterParse(name: string): Promise<Character> {
  const encodeId = encodeURI(name);
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000/parse/${encodeId}`
      : `http://www.lochek.site:3000/parse/${encodeId}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
}

const useUpdateCharacterParse = () => {
  return useMutation((name: string) => updateCharacterParse(name));
};

export default useUpdateCharacterParse;
