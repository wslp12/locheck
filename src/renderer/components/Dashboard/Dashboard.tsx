/* eslint-disable react/jsx-indent */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import produce from 'immer';

import { useRecoilState, useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import ProfileImg from '../ProfileImg';
import TodoList from '../TodoList/TodoList';
import { todoState, TODO_LIST } from '../../recoil/todo';
import { authState } from '../../recoil/auth';
import { sortAtomState } from '../../recoil/sort';

dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export default function DashboardContent() {
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [todoList, setTodoList] = useRecoilState(todoState);
  const sortState = useRecoilValue(sortAtomState);

  const charList = userInfo
    .filter((user) => {
      return user.display;
    })
    .sort((a, b) => b.itemLevel - a.itemLevel);

  React.useEffect(() => {
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
          } else {
            dsTodo[fIdx].list = TODO_LIST.map((item) => {
              const todoIdx = dsTodo[fIdx].list.findIndex(
                (todo) => todo.name === item.name,
              );
              return {
                ...item,
                done: dsTodo[fIdx].list[todoIdx].done ?? false,
                doneTime: dsTodo[fIdx].list[todoIdx].doneTime ?? '',
                display: dsTodo[fIdx].list[todoIdx].display ?? item.display,
              };
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
  }, []);

  return (
    <Grid container spacing={charList.length}>
      {sortState
        ? todoList
            .slice()
            .sort((a, b) => {
              const userA = userInfo.find((char) => char.name === a.id);
              const userB = userInfo.find((char) => char.name === b.id);

              const aList = a.list.filter((item) => {
                return (
                  item.gold > 0 &&
                  (userA?.itemLevel ?? 0) >= item.level &&
                  item.display &&
                  !item.done
                );
              });
              const bList = b.list.filter((item) => {
                return (
                  item.gold > 0 &&
                  (userB?.itemLevel ?? 0) >= item.level &&
                  item.display &&
                  !item.done
                );
              });

              const aGold = aList.reduce((acc, todo) => {
                return (
                  acc +
                  (todo.name === '아르고스' && (userA?.itemLevel ?? 0) >= 1475
                    ? 0
                    : todo.gold)
                );
              }, 0);
              const bGold = bList.reduce((acc, todo) => {
                return (
                  acc +
                  (todo.name === '아르고스' && (userB?.itemLevel ?? 0) >= 1475
                    ? 0
                    : todo.gold)
                );
              }, 0);
              console.log(aGold, userA?.name, bGold, userB?.name);
              return bGold - aGold;
            })
            .map((item) => {
              const user = userInfo.find((char) => char.name === item.id);
              if (!user) {
                return (
                  <div key={item.id}>
                    캐릭터가 할일 리스트에 포함되어 있지 않습니다
                  </div>
                );
              }
              if (!user.display) {
                return <div key={item.id} style={{ display: 'none' }} />;
              }
              return (
                <Grid item xs={12} key={user.name}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <div
                      key={user.name}
                      style={{
                        display: 'flex',
                        margin: '0px',
                        padding: '0px',
                        overflow: 'auto',
                      }}
                    >
                      <div>
                        <ProfileImg
                          src={user.jobProfileSrc}
                          alt={user.name}
                          // onClick={(e) => handleClick(e, user)}
                          onClick={(e) => console.log(e)}
                        />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <span>{user.name}</span>
                          <span>{user.itemLevel}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex' }}>
                        <TodoList user={user} />
                      </div>
                    </div>
                  </Paper>
                </Grid>
              );
            })
        : charList.map((user) => (
            <Grid item xs={12} key={user.name}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div
                  key={user.name}
                  style={{
                    display: 'flex',
                    margin: '0px',
                    padding: '0px',
                    overflow: 'auto',
                  }}
                >
                  <div>
                    <ProfileImg
                      src={user.jobProfileSrc}
                      alt={user.name}
                      // onClick={(e) => handleClick(e, user)}
                      onClick={(e) => console.log(e)}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span>{user.name}</span>
                      <span>{user.itemLevel}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <TodoList user={user} />
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
    </Grid>
  );
}
