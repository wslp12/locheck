/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';
import { Character } from '../recoil/character-list.state';

async function updateCharacter(
  name: string,
  display: boolean,
): Promise<Character> {
  const encodeId = encodeURI(name);
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000/character/${encodeId}`
      : `http://lochek.com:3000/character/${encodeId}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ display }),
  }).then((res) => {
    return res.json();
  });
}

const useUpdateCharacter = () => {
  return useMutation(({ name, display }: { name: string; display: boolean }) =>
    updateCharacter(name, display),
  );
};

export default useUpdateCharacter;
