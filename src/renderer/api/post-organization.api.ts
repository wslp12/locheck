/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';

type Id = string;

async function postOrganization(name: string, gName: string) {
  const encodeId = encodeURI(gName);
  const url = `http://lochek.com:3000/oranization/${encodeId}`;

  console.log(name, gName);
  const headers = new Headers();
  headers.append('name', encodeURIComponent(name));
  return fetch(url, {
    method: 'POST',
    headers,
  }).then((res) => {
    return res.json();
  });
}

const usePostOrganization = () => {
  return useMutation(({ name, gName }: { name: string; gName: string }) =>
    postOrganization(name, gName),
  );
};

export default usePostOrganization;
