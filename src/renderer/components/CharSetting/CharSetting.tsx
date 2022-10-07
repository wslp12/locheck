/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import React from 'react';
import { Switch } from '@mui/material';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import characterLsitAtomState, {
  Character,
} from '../../recoil/character-list.state';
import { Todo, todoState } from '../../recoil/todo';
import { userAtomState } from '../../recoil/user.state';
import useUpdateCharacter from '../../api/update-character.api';
import useUpdateTodo from '../../api/update-todo.api';
import { QUERY_KEY } from '../../enum';
import useGetUserInfo, { useGetUserInfoEnable } from '../../api/get-user';

function CharSetting() {
  const queryClient = useQueryClient();

  const [characterListState, setCharacterListState] = useRecoilState(
    characterLsitAtomState,
  );
  const [userInfo, setUserInfo] = useRecoilState(userAtomState);

  const { mutate: characterUpdate } = useUpdateCharacter();

  const { data, refetch } = useGetUserInfoEnable(userInfo?.name ?? '');

  console.log('%cuserInfo', 'color: blue', userInfo);
  console.log('%ccharacterListState', 'color: orange', characterListState);
  console.log('%cdata', 'color: gold', data);
  const charList: Character[] =
    characterListState.length > 0
      ? characterListState
      : data?.characterList ?? [];

  const handleDisplayClick = (char: Character) => {
    if (userInfo === null) {
      setCharacterListState((ps) =>
        produce(ps, (ds) => {
          const fidx = ds.findIndex((item) => item.name === char.name);
          if (fidx !== -1) {
            ds[fidx].display = !ds[fidx].display;
          }
        }),
      );
    } else {
      characterUpdate(
        { name: char.name, display: !char.display },
        {
          onSuccess: (res: Character) => {
            queryClient.invalidateQueries([QUERY_KEY.USER_INFO]);
          },
        },
      );
    }
  };

  console.log('%ccharList', 'color: red', charList);

  return (
    <div style={{ display: 'flex' }}>
      {charList
        ?.slice()
        .sort((a, b) => {
          return b.itemLevel - a.itemLevel;
        })
        .map((char) => {
          return (
            <div key={char.name}>
              <img src={char.profileSrc} alt={char.name} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  {char.name}({char.itemLevel})
                </div>
                <div>
                  <Switch
                    defaultChecked={char.display}
                    onClick={() => handleDisplayClick(char)}
                  />
                </div>
              </div>
              <RaidSetting character={char} />
            </div>
          );
        })}
    </div>
  );
}

function RaidSetting(props: { character: Character }) {
  const { character } = props;

  const [todoList, setTodoList] = useRecoilState(todoState);
  const [userInfo, setUserInfo] = useRecoilState(userAtomState);
  const { mutate: updateTodo } = useUpdateTodo();

  const handleDisplayClick = (todo: Todo) => {
    console.log('todo', todo);
    if (userInfo === null) {
      setTodoList((ps) =>
        produce(ps, (ds) => {
          if (!ds) return;
          const todoIdx = ds.findIndex((item) => item.id === todo.id);
          console.log('todoIdx', todoIdx);
          if (todoIdx > -1) {
            ds[todoIdx].display = !ds[todoIdx].display;
          }
        }),
      );
    } else {
      updateTodo(
        { id: +todo.id, formData: { display: !todo.display } },
        {
          onSuccess: (res) => {
            if ('statusCode' in res) {
              toast.error('윤지용 때문에 서버가 죽었습니다. 돈이 없습니다');
            }
            setUserInfo((ps) =>
              produce(ps, (ds) => {
                if (!ds) return;
                const todoIdx = ds.todoList.findIndex(
                  (item) => item.id === res.id,
                );
                if (todoIdx > -1) {
                  ds.todoList[todoIdx].display = res.display;
                }
              }),
            );
            console.log('res', res);
          },
          onError(error, variables, context) {
            toast.error('윤지용 때문에 서버가 죽었습니다. 돈이 없습니다');
          },
        },
      );
    }
  };

  return (
    <>
      {(userInfo !== null ? userInfo?.todoList : todoList)
        ?.filter((item) => item.characterName === character.name)
        .map((todo) => {
          return (
            <div key={todo.id}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>{todo.raid.name}</div>
                <div>
                  <Switch
                    defaultChecked={todo.display}
                    onClick={() => handleDisplayClick(todo)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default CharSetting;
