/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';
import { Popper, Fade, Box, Popover } from '@mui/material';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import 'dayjs/locale/ko';
import { authState } from '../../recoil/auth';
import { todoState, TODO_LIST } from '../../recoil/todo';
import ProfileImg from '../ProfileImg';
import TodoList from '../TodoList';

dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isBetween);

function Home() {
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [todoList, setTodoList] = useRecoilState(todoState);

  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    userInfo.forEach((user) => {
      setTodoList((psTodo) =>
        produce(psTodo, (dsTodo) => {
          const fIdx = dsTodo.findIndex((item) => item.id === user.name);
          if (fIdx === -1) {
            const cTodo = TODO_LIST.filter((todo) => {
              console.log(todo.level, user.itemLevel);
              return todo.level <= user.itemLevel;
            });

            console.log(cTodo);
            dsTodo.push({
              id: user.name,
              list: cTodo,
            });
          }
        }),
      );
    });

    setTodoList((ps) =>
      produce(ps, (ds) => {
        ds.map((todoListItem) => {
          todoListItem.list.forEach((todo) => {
            if (dayjs().hour() < 6) {
              return;
            }
            if (!todo.done) return;
            console.log(
              dayjs().hour(),
              todo.done,
              todo.name,
              todoListItem.id,
              todo.doneTime,
            );
            if (
              todo.name === '가디언' ||
              todo.name === '카오스던전' ||
              todo.name === '에포나'
            ) {
              if (dayjs(todo.doneTime).isToday()) {
                return;
              }
              todo.done = false;
            } else {
              const oldDay = dayjs(todo.doneTime);

              const diff = dayjs().diff(oldDay, 'days');
              for (let index = 1; index <= diff; index += 1) {
                if (oldDay.add(index, 'day').day() === 3) {
                  todo.done = false;
                  break;
                }
              }
            }
          });
        });
      }),
    );

    if ((globalThis as any).ipc) {
      (globalThis as any).ipc.on('refresh', () => {
        setTodoList((ps) =>
          produce(ps, (ds) => {
            ds.map((todoListItem) => {
              todoListItem.list.forEach((todo) => {
                if (dayjs().hour() < 6) {
                  return;
                }
                if (!todo.done) return;
                console.log(
                  dayjs().hour(),
                  todo.done,
                  todo.name,
                  todoListItem.id,
                  todo.doneTime,
                );
                if (
                  todo.name === '가디언' ||
                  todo.name === '카오스던전' ||
                  todo.name === '에포나'
                ) {
                  if (dayjs(todo.doneTime).isToday()) {
                    return;
                  }
                  todo.done = false;
                } else {
                  const oldDay = dayjs(todo.doneTime);

                  const diff = dayjs().diff(oldDay, 'days');
                  for (let index = 1; index <= diff; index += 1) {
                    if (oldDay.add(index, 'day').day() === 3) {
                      todo.done = false;
                      break;
                    }
                  }
                }
              });
            });
          }),
        );
      });
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {userInfo.map((user) => (
        <div key={user.name}>
          <div
            style={{
              display: 'flex',
              border: '2px solid black',
            }}
          >
            <div>
              <ProfileImg
                src={user.jobProfileSrc}
                alt={user.name}
                aria-describedby={id}
                onClick={handleClick}
              />

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <div>
                  <ul>
                    <li>전체 클리어</li>
                    <li>전체 활성화</li>
                    <li>숨기기</li>
                  </ul>
                </div>
              </Popover>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{user.level}</span>
              <span>{user.name}</span>
              <span>{user.job}</span>
              <span>{user.itemLevel}</span>
            </div>
            <div style={{ display: 'flex' }}>
              <TodoList user={user} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
