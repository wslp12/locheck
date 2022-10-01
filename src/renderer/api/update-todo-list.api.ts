/* eslint-disable no-promise-executor-return */
import { useMutation } from '@tanstack/react-query';

type Id = { groupName: string; characterName: string };

const updateTodoList = async (
  id: Id,
  formData: { done: boolean; doneTime: string },
) => {
  const url = `http://localhost:3000/todo/groupname/${id.groupName}/charactername/${id.characterName}`;
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

const useUpdateTodoList = () => {
  return useMutation(
    ({
      id,
      formData,
    }: {
      id: Id;
      formData: { done: boolean; doneTime: string };
    }) => updateTodoList(id, formData),
  );
};

export default useUpdateTodoList;
