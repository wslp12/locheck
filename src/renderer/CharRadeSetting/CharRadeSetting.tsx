/* eslint-disable no-param-reassign */
import React from 'react';
import produce from 'immer';
import { Switch } from '@mui/material';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/auth';
import { TodoId, todoState, TODO_LIST } from '../recoil/todo';

function CharRadeSetting() {
  const [charInfo, setCharInfo] = useRecoilState(authState);
  const [todoList, setTodoList] = useRecoilState(todoState);

  const handleDisplayClick = (todoName: string, todoId: TodoId) => {
    setTodoList((ps) =>
      produce(ps, (ds) => {
        const fidx = ds.findIndex((item) => item.id === todoId);
        if (fidx !== -1) {
          const todoIdx = ds[fidx].list.findIndex(
            (todos) => todos.name === todoName,
          );
          if (todoIdx !== -1) {
            ds[fidx].list[todoIdx].display = !ds[fidx].list[todoIdx].display;
          }
        }
      }),
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {charInfo.map((char) => {
        return (
          <div key={char.name}>
            <img src={char.profileSrc} alt={char.name} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {char.name}/{char.itemLevel}
              {todoList
                .filter((todos) => {
                  return todos.id === char.name;
                })
                .map((todos) => {
                  return todos.list.map((todo) => {
                    return (
                      <div key={todo.name}>
                        {todo.name}
                        <Switch
                          defaultChecked={todo.display}
                          onClick={() =>
                            handleDisplayClick(todo.name, char.name)
                          }
                        />
                      </div>
                    );
                  });
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharRadeSetting;
