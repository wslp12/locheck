/* eslint-disable no-promise-executor-return */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';

type Id = string;

const getUserInfo = async (id: Id) => {
  const encodeId = encodeURI(id);
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000/user/${encodeId}`
      : `http://www.lochek.site:3000/user/${encodeId}`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
};

const useGetUserInfo = (id: Id) => {
  return useQuery([QUERY_KEY.USER_INFO], () => getUserInfo(id), {
    enabled: false,
  });
};

export const useGetUserInfoEnable = (id: Id) => {
  return useQuery([QUERY_KEY.USER_INFO], () => getUserInfo(id));
};

export default useGetUserInfo;
