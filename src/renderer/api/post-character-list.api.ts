/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';

type Id = string;

const postCharacterList = async (id: Id) => {
  const encodeId = encodeURI(id);
  const url = `http://lochek.com:3000/parse/${encodeId}`;
  return fetch(url, {
    method: 'POST',
  }).then((res) => {
    return res;
  });
};

const usePostCharacterList = () => {
  return useMutation((id: Id) => postCharacterList(id));
};

export default usePostCharacterList;
