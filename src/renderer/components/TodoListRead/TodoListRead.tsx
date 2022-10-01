/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useParams } from 'react-router-dom';

import { Todo, TodoState, todoState } from '../../recoil/todo';
import donePng from '../../assets/done.png';
import { userAtomState } from '../../recoil/user.state';
import { Character } from '../../recoil/character-list.state';
import useUpdateTodo from '../../api/update-todo.api';
import useUpdateTodoList from '../../api/update-todo-list.api';
import useGetTodoList from '../../api/get-todo-list.api';

const GetGold = (props: { todo: Todo; user: any }) => {
  const { user, todo } = props;

  if (todo.raid.gold <= 0) {
    return <div />;
  }

  if (todo.done) {
    return <div />;
  }

  if (todo.raid.name === '아르고스' && user.itemLevel >= 1475) {
    return <div />;
  }

  return (
    <div>
      <span style={{ color: 'gold' }}>
        <AttachMoneyIcon />
        {todo.raid.gold}
      </span>
    </div>
  );
};

function TodoListRead(props: { character: Character }) {
  const { character } = props;

  const { tokenName } = useParams();

  const { data: todoList } = useGetTodoList(tokenName ?? '');

  console.log('todoList', todoList);

  return (
    <>
      {todoList
        ?.filter((item) => item.characterName === character.name)
        .filter((todo) => {
          return todo.display;
        })
        .map((todo) => {
          return (
            <div
              key={todo.raid.name}
              style={{
                width: '100px',
                height: '100%',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <img
                src={donePng}
                alt={todo.raid.name}
                width={100}
                style={{
                  position: 'absolute',
                  display: `${todo.done ? 'block' : 'none'}`,
                }}
              />
              <img
                src={`http://lochek.com/${todo.raid.srcName}.png`}
                alt={todo.raid.name}
                width={100}
              />
              <GetGold todo={todo} user={character} />
            </div>
          );
        })}
    </>
  );
}

export default TodoListRead;
