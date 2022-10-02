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

import { Todo } from '../../recoil/todo';
import { Character } from '../../recoil/character-list.state';
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

  return (
    <>
      {todoList
        ?.filter((item) => item.characterName === character.name)
        .filter((todo) => {
          return todo.display;
        })
        .sort((a, b) => {
          return a.raid.order - b.raid.order;
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
                padding: '5px',
              }}
            >
              <img
                src="http://lochek.com/done.png"
                alt={todo.raid.name}
                width={100}
                style={{
                  borderRadius: '45px',
                  padding: '1px',
                  position: 'absolute',
                  display: `${todo.done ? 'block' : 'none'}`,
                  top: '0px',
                }}
              />
              <img
                src={`http://lochek.com/${todo.raid.srcName}`}
                alt={todo.raid.name}
                style={{
                  width: '90px',
                  height: '90px',
                  opacity: `${todo.done ? '0.35' : '1'}`,
                  borderRadius: '45px',
                  // padding: '1px',
                  // backgroundColor: '#d50000',
                  // border: '1px solid red',
                }}
              />
              <div
                style={{
                  fontSize: '14px',
                  opacity: `${todo.done ? '0.35' : '1'}`,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  overflow: 'hidden',
                  textAlign: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                {todo.raid.name}
              </div>
              <GetGold todo={todo} user={character} />
            </div>
          );
        })}
    </>
  );
}

export default TodoListRead;
