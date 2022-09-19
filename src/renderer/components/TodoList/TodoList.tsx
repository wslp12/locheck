/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
import React from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Auth } from '../../recoil/auth';
import { Todo, TodoId, todoState } from '../../recoil/todo';
import donePng from '../../assets/done.png';

const GetGold = (props: { todo: Todo; user: Auth }) => {
  const { user, todo } = props;

  if (todo.gold <= 0) {
    return <div />;
  }

  if (todo.done) {
    return <div />;
  }

  if (todo.name === '아르고스' && user.itemLevel >= 1475) {
    return <div />;
  }

  return (
    <div>
      <span style={{ color: 'gold' }}>
        <AttachMoneyIcon />
        {todo.gold}
      </span>
    </div>
  );
};

function TodoList(props: { user: Auth }) {
  const { user } = props;

  const [todoList, setTodoList] = useRecoilState(todoState);

  const handleClickCheckTodo = (
    id: TodoId,
    todoGroupName: Todo['groupName'],
  ) => {
    setTodoList((ps) =>
      produce(ps, (ds) => {
        const todoListIdx = ds.findIndex(
          (todoListItem) => todoListItem.id === id,
        );
        if (todoListIdx !== -1) {
          const todoLists = ds[todoListIdx].list.filter(
            (item) => item.groupName === todoGroupName,
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
  };

  const currentTodoList = todoList.find((item) => item.id === user.name);

  return (
    <>
      {currentTodoList?.list
        .filter((todo) => {
          return user.itemLevel >= todo.level;
        })
        .filter((todo) => {
          return todo.display;
        })
        // .sort((a, b) => {
        //   return Number(a.done) - Number(b.done);
        // })
        .map((todo) => {
          if (todo.srcName !== '') {
            return (
              <div
                key={todo.name}
                style={{
                  width: '100px',
                  height: '100%',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onClick={() =>
                  handleClickCheckTodo(currentTodoList.id, todo.groupName)
                }
              >
                <img
                  src={donePng}
                  alt={todo.name}
                  width={100}
                  style={{
                    position: 'absolute',
                    display: `${todo.done ? 'block' : 'none'}`,
                  }}
                />
                <img src={todo.srcName} alt={todo.name} width={100} />
                <GetGold todo={todo} user={user} />
              </div>
            );
          } else {
            return (
              <div style={{ width: '100px', height: '100px' }} key={todo.name}>
                <button
                  style={{
                    width: '100px',
                    height: '50px',
                    fontSize: '13px',
                  }}
                  type="button"
                  className={`${todo.done ? 'bg-gray-500' : 'bg-blue-500'} ${
                    todo.done ? 'hover:bg-gray-700' : 'hover:bg-blue-700'
                  } text-white font-bold py-2 px-4 rounded`}
                  onClick={() =>
                    handleClickCheckTodo(currentTodoList.id, todo.groupName)
                  }
                >
                  {todo.name}
                </button>
              </div>
            );
          }
        })}
    </>
  );
}

export default TodoList;
