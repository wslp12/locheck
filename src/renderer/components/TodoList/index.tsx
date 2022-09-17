/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
import React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { produce } from 'immer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Auth } from '../../recoil/auth';
import { Todo, TodoId, todoItem, todoState } from '../../recoil/todo';

function TodoList(props: { user: Auth }) {
  const { user } = props;

  const [todoList, setTodoList] = useRecoilState(todoState);

  // console.log(user.name);

  const handleClickCheckTodo = (id: TodoId, todoName: Todo['name']) => {
    console.log('todoName', id, todoName);
    setTodoList((ps) =>
      produce(ps, (ds) => {
        const todoListIdx = ds.findIndex(
          (todoListItem) => todoListItem.id === id,
        );
        if (todoListIdx !== -1) {
          const todoIdx = ds[todoListIdx].list.findIndex(
            (item) => item.name === todoName,
          );
          if (todoIdx !== -1) {
            ds[todoListIdx].list[todoIdx].done = !ds[todoListIdx].list[todoIdx]
              .done;
            ds[todoListIdx].list[todoIdx].doneTime = dayjs().format(
              'YYYY-MM-DDTHH:mm:ss',
            );
          }
        }
      }),
    );
  };

  const currentTodoList = todoList.find((item) => item.id === user.name);

  return (
    <>
      {currentTodoList?.list
        .filter((todo) => {
          return user.itemLevel >= todo.level;
        })
        .filter((todo) => {
          if (todo.name === '발탄[노말]' && user.itemLevel >= 1445) return;
          return todo;
        })
        .filter((todo) => {
          if (todo.name === '비아키스[노말]' && user.itemLevel >= 1460) return;
          return todo;
        })
        .sort((a, b) => {
          return Number(a.done) - Number(b.done);
        })
        .map((todo) => {
          return (
            <button
              key={todo.name}
              type="button"
              className={`${todo.done ? 'bg-gray-500' : 'bg-blue-500'} ${
                todo.done ? 'hover:bg-gray-700' : 'hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded`}
              onClick={() =>
                handleClickCheckTodo(currentTodoList.id, todo.name)
              }
            >
              {todo.name}
            </button>
          );
        })}
    </>
  );
}

export default TodoList;
