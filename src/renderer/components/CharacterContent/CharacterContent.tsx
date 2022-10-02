/* eslint-disable no-param-reassign */
// /* eslint-disable react/jsx-indent */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-else-return */
// /* eslint-disable prefer-const */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable import/extensions */
// /* eslint-disable no-confusing-arrow */
// /* eslint-disable @typescript-eslint/no-inferrable-types */
// /* eslint-disable react/jsx-curly-brace-presence */
// /* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import produce from 'immer';

import { useRecoilState, useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';

import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import ProfileImg from '../ProfileImg';

import TodoList from '../TodoList/TodoList';
import { Raid, todoState } from '../../recoil/todo';
// import { authState } from '../../recoil/user.state';
// import { sortAtomState } from '../../recoil/sort';
import characterLsitAtomState, {
  Character,
} from '../../recoil/character-list.state';
import useGetRaidList from '../../api/get-raid-list.api';
import { userAtomState } from '../../recoil/user.state';
import useGetCharacterList, {
  useGetCharacterList2,
} from '../../api/get-character-list.api';
import TodoListRead from '../TodoListRead/TodoListRead';

dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export default function CharacterContent() {
  const { tokenName } = useParams();

  const navi = useNavigate();

  const userState = useRecoilValue(userAtomState);
  const { data: characterListState } = useGetCharacterList2(tokenName ?? '');

  React.useEffect(() => {
    if (userState === null) {
      toast.error('차단 당합니다. 강제로 접근하지 마세요');
      navi('/dashboard');
    }
  }, [userState]);

  const validate = (c: typeof characterListState) => {
    if (c === undefined) return [];
    if ('concat' in c) {
      return c;
    }
    return [];
  };

  const result = validate(characterListState);

  return (
    <Grid container spacing={2}>
      {result
        .slice()
        .sort((a, b) => b.itemLevel - a.itemLevel)
        .map((character) => {
          return (
            <Grid item xs={12} key={character.name}>
              <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  key={character.name}
                  style={{
                    display: 'flex',
                    margin: '0px',
                    padding: '0px',
                    overflow: 'auto',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '5px',
                    }}
                  >
                    <ProfileImg
                      src={character.jobProfileSrc}
                      alt={character.name}
                      // onClick={(e) => console.log(e)}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '14px',
                      }}
                    >
                      <span>{character.name}</span>
                      <span>{character.itemLevel}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <TodoListRead character={character} />
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}
    </Grid>
  );
}
