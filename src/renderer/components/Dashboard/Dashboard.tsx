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
      {/* {todoList.map((item) => )} */}
      {charList.map((user) => (
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
