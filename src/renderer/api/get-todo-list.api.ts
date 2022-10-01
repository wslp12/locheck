/* eslint-disable no-promise-executor-return */
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../enum';
import { Todo } from '../recoil/todo';

async function getTodoList(userName: string): Promise<Todo[]> {
  const url = `http://localhost:3000/todo/${decodeURIComponent(userName)}`;
  return fetch(url, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
}

const useGetTodoList = (userName: string) => {
  return useQuery(
    [QUERY_KEY.TODO_LIST, userName],
    () => getTodoList(userName),
    {
      enabled: userName !== '',
    },
  );
};

export default useGetTodoList;
