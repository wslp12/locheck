/* eslint-disable no-promise-executor-return */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';

type Id = string;

const getUserInfo = async (id: Id) => {
  const encodeId = encodeURI(id);
  const url = `http://localhost:3000/user/${encodeId}`;
  return fetch(url, {
    method: 'GET',
  });
};

const useGetUserInfo = (id: Id) => {
  return useQuery([QUERY_KEY.USER_INFO], () => getUserInfo(id), {
    enabled: false,
  });
};

export default useGetUserInfo;
