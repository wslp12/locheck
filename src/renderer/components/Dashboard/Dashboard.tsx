/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
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

import produce from 'immer';

import { useRecoilState, useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

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
import useGetUserInfo from '../../api/get-user';

dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isBetween);

// a little function to help us with reordering the result
const reorder = (
  list: Character[],
  startIndex: number,
  endIndex: number,
): Character[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function DashboardContent() {
  const [userInfo, setUserInfo] = useRecoilState(userAtomState);
  const { data, refetch } = useGetUserInfo(userInfo?.name ?? '');
  const [todoList, setTodoList] = useRecoilState(todoState);

  const [characterListState, setCharacterListState] = useRecoilState(
    characterLsitAtomState,
  );

  const { data: raidList } = useGetRaidList(true);

  const charList: Character[] =
    characterListState.length > 0
      ? characterListState
      : data?.characterList ?? [];

  const getDisplay = (character: Character, raid: Raid) => {
    if (raid.name === '비아키스[노말]' && character.itemLevel >= 1460) {
      return false;
    } else if (raid.name === '발탄[노말]' && character.itemLevel >= 1445) {
      return false;
    } else if (raid.name === '카양겔[노말]' && character.itemLevel >= 1520) {
      return false;
    } else if (raid.name === '카양겔[하드][1]' && character.itemLevel >= 1560) {
      return false;
    } else if (raid.name === '카양겔[하드][2]' && character.itemLevel >= 1580) {
      return false;
    } else if (
      raid.name === '아브렐슈드[노말][1-2]' &&
      character.itemLevel >= 1540
    ) {
      return false;
    } else if (
      raid.name === '아브렐슈드[노말][3-4]' &&
      character.itemLevel >= 1550
    ) {
      return false;
    } else if (
      raid.name === '아브렐슈드[노말][5-6]' &&
      character.itemLevel >= 1560
    ) {
      return false;
    } else if (raid.level > character.itemLevel) {
      /**
       * 숙제 레벨이 유저 레벨보다 높으면 안보여준다
       */
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (!raidList || !characterListState) return;
    characterListState.forEach((character) => {
      raidList.forEach((raid) => {
        setTodoList((psTodo) =>
          produce(psTodo, (dsTodo) => {
            const fIdx = dsTodo.findIndex(
              (item) =>
                item.raid.name === raid.name &&
                item.characterName === character.name,
            );
            if (fIdx === -1) {
              dsTodo.push({
                id: uuidv4(),
                characterName: character.name,
                display: getDisplay(character, raid),
                done: false,
                doneTime: '',
                raid,
              });
            }
          }),
        );
      });
    });
  }, [raidList, characterListState]);

  React.useEffect(() => {
    if (userInfo?.name !== '') {
      refetch();
    }
  }, [userInfo?.name]);
  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: Character[] = reorder(
      characterListState,
      result.source.index,
      result.destination.index,
    );

    console.log('items', items);

    setCharacterListState(
      items.map((item, index) => ({ ...item, order: index })),
    );
    // setState(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot): JSX.Element => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Grid container spacing={2}>
              {charList
                ?.slice()
                .sort((a, b) => a.order - b.order)
                .filter((item) => item.display)
                .map((character, index) => (
                  <Draggable
                    key={character.name}
                    draggableId={character.name}
                    index={index}
                  >
                    {(provided, snapshot): JSX.Element => (
                      <Grid
                        item
                        xs={12}
                        key={character.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Paper
                          sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
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
                              <TodoList character={character} />
                            </div>
                          </div>
                        </Paper>
                      </Grid>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </Grid>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
