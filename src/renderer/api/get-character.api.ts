// /* eslint-disable no-promise-executor-return */
// import { useQuery } from '@tanstack/react-query';
// import { QUERY_KEY } from '../enum';

// type Id = string;

// const getCharacter = async (id: Id) => {
//   const encodeId = encodeURI(id);
//   const url = `http://localhost:3000/character/${encodeId}`;
//   return fetch(url, {
//     method: 'GET',
//   }).then((res) => {
//     return res.json();
//   });
// };

// const usegetCharacter = (id: Id) => {
//   return useQuery([QUERY_KEY.USER_INFO], () => getCharacter(id), {
//     enabled: false,
//   });
// };

// export default usegetCharacter;
