import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';

type Id = string;

const getChars = async (id: Id) => {
  const encodeId = encodeURI(id);
  return fetch(
    `https://lostark.game.onstove.com/Profile/Character/${encodeId}`,
    {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        Host: 'lostark.game.onstove.com',
        Referer: 'https://lostark.game.onstove.com/Profile/Character',
        'Sec-Fetch-Dest': 'document',
      },
    },
  ).then((data) => {
    // console.log(data);
    console.log(data.status);
    // console.log(data.headers);
    console.log(data.ok);
    // console.log(data.body);
    // console.log(data.type);

    // data
    //   .text()
    //   .then((dataText) => {
    //     console.log(dataText);
    //   })
    //   .catch((err) => console.log('text', err));

    // data
    //   .json()
    //   .then((dataText) => {
    //     console.log(dataText);
    //   })
    //   .catch((err) => console.log('json', err));

    // return data.text();
  });
};

const useGetChars = (id: Id) => {
  const replacedId = id.replace(/\s/g, '');
  const isEnabled = replacedId !== '';

  return useQuery([QUERY_KEY.GET_CARHS], () => getChars(id), {
    enabled: false,
  });
};

export default useGetChars;
