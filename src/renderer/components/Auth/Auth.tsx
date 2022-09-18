/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';
import { produce } from 'immer';
import dayjs from 'dayjs';
import { authState } from '../../recoil/auth';
import { RECOIL_KEY } from '../../enum';
import { todoState, TODO_LIST } from '../../recoil/todo';
import MainLayout from '../Layout/MainLayout';

function Auth() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const setTodoList = useSetRecoilState(todoState);

  useEffect(() => {
    if (auth === undefined || auth === null || auth.length === 0) {
      navigate('/login');
    }
  }, [auth]);

  useEffect(() => {
    if ((globalThis as any).ipc) {
      const ipc = (globalThis as any).ipc;
      ipc.on('moveHide', () => {
        navigate('/char-setting');
      });
      ipc.on('moveHome', () => {
        navigate('/dashboard');
      });
      ipc.on('moveRade', () => {
        navigate('/char-rade-setting');
      });
      ipc.on('logout', () => {
        globalThis.localStorage.clear();
        globalThis.location.reload();
      });
      ipc.on('homework', () => {
        globalThis.localStorage.removeItem(RECOIL_KEY.TODO_LIST);
        globalThis.location.reload();
      });
      ipc.on('refresh', () => {
        setTodoList((ps) =>
          produce(ps, (ds) => {
            ds.map((todoListItem) => {
              todoListItem.list.forEach((todo) => {
                if (dayjs().hour() < 6) {
                  return;
                }
                if (!todo.done) return;

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
      userInfo.forEach((user) => {
        setTodoList((psTodo) =>
          produce(psTodo, (dsTodo) => {
            const fIdx = dsTodo.findIndex((item) => item.id === user.name);
            if (fIdx === -1) {
              const cTodo = TODO_LIST.map((todo) => {
                if (todo.name === '비아키스[노말]' && user.itemLevel >= 1460) {
                  return {
                    ...todo,
                    display: false,
                  };
                }

                if (todo.name === '발탄[노말]' && user.itemLevel >= 1445) {
                  return {
                    ...todo,
                    display: false,
                  };
                }
                /**
                 * 숙제 레벨이 유저 레벨보다 높으면 안보여준다
                 */
                if (todo.level > user.itemLevel) {
                  return {
                    ...todo,
                    display: false,
                  };
                }
                return todo;
                // return todo.level <= user.itemLevel;
              });

              dsTodo.push({
                id: user.name,
                list: cTodo,
              });
            }
          }),
        );
      });
    }
  }, []);

  return <MainLayout />;
}

export default Auth;
