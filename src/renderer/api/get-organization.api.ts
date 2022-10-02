/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable no-promise-executor-return */
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';

type Id = string;

export type OrgList = {
  id: number;
  name: string;
  profileSrc: string;
  userName: string;
  guserName: string;
};

async function getOrganization(name: string): Promise<OrgList[]> {
  const encodeId = encodeURI(name);
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000/oranization/${encodeId}`
      : `http://lochek.com:3000/oranization/${encodeId}`;

  return fetch(url).then((res) => {
    return res.json();
  });
}

const useGetOrganization = (name: string) => {
  return useQuery([QUERY_KEY.ORG_LIST], () => getOrganization(name), {
    enabled: name !== '',
  });
};

export default useGetOrganization;
