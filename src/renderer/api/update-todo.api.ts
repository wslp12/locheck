/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';

type Id = { groupName: string; characterName: string };

const updateTodo = async (
  id: Id,
  formData: { done: boolean; doneTime: string },
) => {
  const url = `http://lochek.com:3000/todo/${id}`;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    return res;
  });
};

const useUpdateTodo = () => {
  return useMutation(
    ({
      id,
      formData,
    }: {
      id: Id;
      formData: { done: boolean; doneTime: string };
    }) => updateTodo(id, formData),
  );
};

export default useUpdateTodo;
