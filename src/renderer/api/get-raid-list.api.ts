/* eslint-disable no-promise-executor-return */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';

type Id = string;

const getRaidList = async () => {
  const url = `http://localhost:3000/raid`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
};

const useGetRaidList = () => {
  return useQuery([QUERY_KEY.RAID_LIST], getRaidList);
};

export default useGetRaidList;
