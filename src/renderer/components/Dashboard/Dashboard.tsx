/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useRecoilState } from 'recoil';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ProfileImg from '../ProfileImg';
import TodoList from '../TodoList/TodoList';
import { todoState } from '../../recoil/todo';
import { authState } from '../../recoil/auth';

export default function DashboardContent() {
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [todoList, setTodoList] = useRecoilState(todoState);

  const charList = userInfo
    .filter((user) => {
      return user.display;
    })
    .sort((a, b) => b.itemLevel - a.itemLevel);

  return (
    <Grid container spacing={charList.length}>
      {todoList
        .slice()
        // .filter((todo) => {
        //   const user = userInfo.find((char) => char.name === todo.id);
        //   if (!user) return;
        //   todo.list.filter((item) => {
        //     return user.itemLevel >= item.level;
        //   });
        // })
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
          // return aGold > bGold ? 1 : aGold === bGold ? 0 : -1;
          // return 1;
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
          );
        })}
    </Grid>
  );
}
