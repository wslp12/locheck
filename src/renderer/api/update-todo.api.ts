/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';

type Id = number;

const updateTodo = async (id: Id, formData: { display: boolean }) => {
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000/todo/${id}`
      : `http://www.lochek.site:3000/todo/${id}`;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    return res.json();
  });
};

const useUpdateTodo = () => {
  return useMutation(
    ({ id, formData }: { id: Id; formData: { display: boolean } }) =>
      updateTodo(id, formData),
  );
};

export default useUpdateTodo;
