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
import { toast } from 'react-toastify';

import { Todo, TodoState, todoState } from '../../recoil/todo';
import donePng from '../../assets/done.png';
import { userAtomState } from '../../recoil/user.state';
import { Character } from '../../recoil/character-list.state';
import useUpdateTodo from '../../api/update-todo.api';
import useUpdateTodoList from '../../api/update-todo-list.api';

const GetGold = (props: { todo: Todo; user: any }) => {
  const { user, todo } = props;

  if (todo.raid.gold <= 0) {
    return <div />;
  }

  if (todo.raid.name === '아르고스' && user.itemLevel >= 1475) {
    return <div />;
  }

  return (
    <div>
      <span
        style={{
          color: 'gold',
          fontSize: '14px',
          opacity: `${todo.done ? '0.35' : '1'}`,
        }}
      >
        <AttachMoneyIcon />
        {todo.raid.gold}
      </span>
    </div>
  );
};

function TodoList(props: { character: Character }) {
  const { character } = props;

  const [todoList, setTodoList] = useRecoilState(todoState);
  const [userInfo, setUserInfo] = useRecoilState(userAtomState);

  const { mutate: updateTodoList } = useUpdateTodoList();

  const handleClickCheckTodo = (todo: Todo) => {
    if (userInfo !== null) {
      updateTodoList(
        {
          id: {
            groupName: todo.raid.groupName,
            characterName: todo.characterName,
          },
          formData: {
            done: !todo.done,
            doneTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
          },
        },
        {
          onSuccess: async (res) => {
            const result: TodoState[] = await res.json();
            result.forEach((resultItem) => {
              setUserInfo((ps) =>
                produce(ps, (ds) => {
                  if (!ds) return;
                  const idx = ds?.todoList.findIndex(
                    (item) => item.id === resultItem.id,
                  );
                  if (idx !== -1 || idx !== undefined) {
                    ds.todoList[idx].done = resultItem.done;
                    ds.todoList[idx].doneTime = resultItem.doneTime;
                  }
                }),
              );
            });
          },
          onError(error, variables, context) {
            toast.error(
              '윤지용이 돈을 안줘서 서버비용이 없어서 죽어 있습니다.',
            );
          },
        },
      );
    } else {
      setTodoList((ps) =>
        produce(ps, (ds) => {
          const idx = ds.findIndex((item) => item.id === todo.id);
          if (idx !== -1) {
            const todoLists = ds.filter(
              (item) =>
                item.raid.groupName === ds[idx].raid.groupName &&
                item.characterName === ds[idx].characterName,
            );
            todoLists.forEach((item) => {
              item.done = !item.done;
              item.doneTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            });
            // if (todoIdx !== -1) {
            //   ds[todoListIdx].list[todoIdx].done = !ds[todoListIdx].list[todoIdx]
            //     .done;
            //   ds[todoListIdx].list[todoIdx].doneTime = dayjs().format(
            //     'YYYY-MM-DDTHH:mm:ss',
            //   );
            // }
          }
        }),
      );
    }
  };

  // .filter((todo) => {
  //     return character.itemLevel >= todo.level;
  //   })

  // .sort((a, b) => {
  //   return Number(a.done) - Number(b.done);
  // })

  return (
    <>
      {(userInfo !== null ? userInfo?.todoList : todoList)
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
              onClick={() => handleClickCheckTodo(todo)}
            >
              <img
                src="http://www.lochek.site/done.png"
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
                src={`http://www.lochek.site/${todo.raid.srcName}`}
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

export default TodoList;
