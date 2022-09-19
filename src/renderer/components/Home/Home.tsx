/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';
import { Popper, Fade, Box, Popover } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import 'dayjs/locale/ko';
import { Auth, authState } from '../../recoil/auth';
import { todoState, TODO_LIST } from '../../recoil/todo';
import ProfileImg from '../ProfileImg';
import TodoList from '../TodoList/TodoList';
import val from '../../assets/val.png';

dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isBetween);

function Home() {
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [todoList, setTodoList] = useRecoilState(todoState);

  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null);
  const selectedNameRef = useRef<string>();

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    user: Auth,
  ) => {
    setAnchorEl(event.currentTarget);
    selectedNameRef.current = user.name;
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

  const handleDisplay = () => {
    setUserInfo((ps) =>
      produce(ps, (ds) => {
        const fidx = ds.findIndex(
          (item) => item.name === selectedNameRef.current,
        );
        if (fidx !== -1) {
          ds[fidx].display = false;
        }
      }),
    );
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={0} centered>
          <Tab label="전체" />
          <Tab label="일일 퀘스트" />
          <Tab label="어비스" />
          <Tab label="군단장" />
          <Tab label="계정별 퀘스트" />
        </Tabs>
      </Box>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {userInfo
          .filter((user) => {
            return user.display;
          })
          .sort((a, b) => b.itemLevel - a.itemLevel)
          .map((user) => (
            <div key={user.name}>
              <div
                style={{
                  display: 'flex',
                  border: '1px solid black',
                  margin: '2px',
                }}
              >
                <div>
                  <ProfileImg
                    src={user.jobProfileSrc}
                    alt={user.name}
                    aria-describedby={id}
                    onClick={(e) => handleClick(e, user)}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{user.name}</span>
                    <span>{user.itemLevel}</span>
                  </div>
                </div>

                <div style={{ display: 'flex' }}>
                  <TodoList user={user} />
                </div>
              </div>
            </div>
          ))}
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>전체 클리어</div>
              <div>전체 활성화</div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                  handleDisplay();
                }}
              >
                숨기기
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
}

export default Home;
