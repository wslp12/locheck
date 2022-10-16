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
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

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

import { useQueryClient } from '@tanstack/react-query';

import RefreshIcon from '@mui/icons-material/Refresh';

import { toast } from 'react-toastify';

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
import { useGetUserInfoEnable } from '../../api/get-user.api';
import useUpdateCharacterList from '../../api/update-character-list.api';
import { QUERY_KEY } from '../../enum';
import useUpdateCharacter from '../../api/update-character.api';
import useUpdateCharacterParse from '../../api/update-character-parse.api';

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
  console.log(result);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function DashboardContent() {
  const queryClient = useQueryClient();

  const info = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    character: any,
  ) => {
    setAnchorEl(event.currentTarget);
    info.current = character;
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [userInfo] = useRecoilState(userAtomState);
  const { data } = useGetUserInfoEnable(userInfo?.name ?? '');
  const [todoList, setTodoList] = useRecoilState(todoState);
  const { mutate: updateCharacterParse } = useUpdateCharacterParse();

  const [characterListState, setCharacterListState] = useRecoilState(
    characterLsitAtomState,
  );

  const { data: raidList } = useGetRaidList(true);
  const { mutateAsync } = useUpdateCharacterList();

  const charList: Character[] = ((characterListState.length > 0
    ? characterListState
    : data?.characterList ?? []) as Character[])?.filter(
    (item) => item.display,
  );

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

  const handleClickRefreshButton = (character: Character) => {
    console.log(character);
    updateCharacterParse(character.name, {
      onSuccess: (data) => {
        if (!(data as any)?.statusCode) {
          toast.success(`${data.name} 정보 갱신하였습니다`);
        }
      },
    });
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

  const onDragEnd = async (result: DropResult) => {
    console.log('result', result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: Character[] = reorder(
      charList,
      result.source.index,
      result.destination.index,
    );

    console.log('items', items, characterListState.length);

    if (characterListState.length > 0) {
      setCharacterListState(
        items.map((item, index) => ({ ...item, order: index })),
      );
    } else {
      queryClient.setQueryData([QUERY_KEY.USER_INFO], {
        ...userInfo,
        characterList: items.map((item, index) => ({ ...item, order: index })),
      });
      await mutateAsync({
        name: data?.name ?? 'asd22222222222222',
        characterList: items.map((item, index) => ({
          ...item,
          order: index,
        })),
      });
    }
    console.log(2);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot): JSX.Element => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Grid container spacing={2}>
                {charList.map((character, index) => (
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
                        id="test123"
                      >
                        <div
                          style={{
                            position: 'relative',
                          }}
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
                                  src={character.profileSrc}
                                  alt={character.name}
                                  // onClick={(e) => console.log(e)}
                                  onMouseEnter={(e) =>
                                    handlePopoverOpen(e, character)
                                  }
                                  onMouseLeave={handlePopoverClose}
                                />
                              </div>
                              <div style={{ display: 'flex' }}>
                                <TodoList character={character} />
                              </div>
                            </div>
                          </Paper>
                          <button
                            type="button"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '35px',
                              height: '35px',
                              zIndex: '3',
                              backgroundColor: 'aliceblue',
                              borderRadius: '25px',
                            }}
                            onClick={() => handleClickRefreshButton(character)}
                          >
                            <RefreshIcon />
                          </button>
                        </div>
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
          <div>{(info?.current as any)?.name}</div>
          <div>{(info?.current as any)?.itemLevel}</div>
          <div>{(info?.current as any)?.level}</div>
          <div>{(info?.current as any)?.job}</div>
          {/* <div>
            {(info?.current as any)?.raid.gold > 0 && (
              <p>{(info?.current as any)?.raid.gold}</p>
            )}
          </div> */}
        </Typography>
      </Popover>
    </>
  );
}
