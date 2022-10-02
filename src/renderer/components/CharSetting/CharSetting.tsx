/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import React from 'react';
import { Switch } from '@mui/material';
import { useRecoilState } from 'recoil';
import characterLsitAtomState, {
  Character,
} from '../../recoil/character-list.state';
import { todoState } from '../../recoil/todo';
import { userAtomState } from '../../recoil/user.state';
import useUpdateCharacter from '../../api/update-character.api';

function CharSetting() {
  const [charInfo, setCharInfo] = useRecoilState(characterLsitAtomState);
  const [userInfo, setUserInfo] = useRecoilState(userAtomState);

  const { mutate: characterUpdate } = useUpdateCharacter();

  const handleDisplayClick = (char: Character) => {
    if (userInfo === null) {
      setCharInfo((ps) =>
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
            console.log('res', res);
            setCharInfo((ps) =>
              produce(ps, (ds) => {
                const fidx = ds.findIndex((item) => item.name === res.name);
                if (fidx !== -1) {
                  ds[fidx].display = res.display;
                }
              }),
            );
          },
        },
      );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {charInfo
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
                    // onClick={() => handleDisplayClick(char.name)}
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
