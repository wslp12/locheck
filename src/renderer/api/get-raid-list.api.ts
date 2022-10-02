/* eslint-disable no-promise-executor-return */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';
import { Raid } from '../recoil/todo';

type Id = string;

const getRaidList = async () => {
  const url = `http://lochek.com:3000/raid`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json() as Promise<Raid[]>;
  });
};

const useGetRaidList = (isFetch: boolean) => {
  return useQuery([QUERY_KEY.RAID_LIST], getRaidList, {
    enabled: isFetch,
  });
};

export default useGetRaidList;
