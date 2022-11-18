/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { toast } from 'react-toastify';

import { useQueryClient } from '@tanstack/react-query';

import { Todo, TodoState, todoState } from '../../recoil/todo';
import donePng from '../../assets/done.png';
import { userAtomState } from '../../recoil/user.state';
import { Character } from '../../recoil/character-list.state';
import useUpdateTodo from '../../api/update-todo.api';
import useUpdateTodoList from '../../api/update-todo-list.api';
import { useGetUserInfoEnable, UserInfo } from '../../api/get-user.api';

import { QUERY_KEY } from '../../enum';

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

  const queryClient = useQueryClient();
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [userInfo, setUserInfo] = useRecoilState(userAtomState);
  const { data, refetch } = useGetUserInfoEnable(userInfo?.name ?? '');

  const { mutate: updateTodoList } = useUpdateTodoList();

  const handleClickCheckTodo = (todo: Todo) => {
    console.log('userInfo', userInfo);
    if (data !== null) {
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
              queryClient.setQueryData([QUERY_KEY.USER_INFO], (ps) =>
                produce(ps, (ds: UserInfo) => {
                  if (ds === undefined) return;
                  result.forEach((item) => {
                    ds.todoList.forEach((userInfoItem) => {
                      if (userInfoItem.id === item.id) {
                        userInfoItem.done = item.done;
                        userInfoItem.doneTime = item.doneTime;
                      }
                    });
                  });
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

  const info = useRef();

  // .filter((todo) => {
  //     return character.itemLevel >= todo.level;
  //   })

  // .sort((a, b) => {
  //   return Number(a.done) - Number(b.done);
  // })
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // const handlePopoverOpen1 = (
  //   event: React.MouseEvent<HTMLElement>,
  //   todo: any,
  // ) => {
  //   setAnchorEl(event.currentTarget);
  //   info.current = todo;
  // };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      {(data !== null ? data?.todoList : todoList)
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
                width: '90px',
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
                }}
              />
              <img
                src={`http://www.lochek.site/${todo.raid.srcName}`}
                alt={todo.raid.name}
                style={{
                  width: '80px',
                  height: '80px',
                  opacity: `${todo.done ? '0.35' : '1'}`,
                  borderRadius: '45px',
                  // padding: '1px',
                  // backgroundColor: '#d50000',
                  // border: '1px solid red',
                }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen1(e, todo)}
                onMouseLeave={handlePopoverClose}
              />
            </div>
          );
        })}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }} variant="body2" component="div">
          <div>{(info?.current as any)?.raid.name}</div>
          <div>
            {(info?.current as any)?.raid.gold > 0 && (
              <p>{(info?.current as any)?.raid.gold}</p>
            )}
          </div>
        </Typography>
      </Popover>
    </>
  );
}

export default TodoList;
