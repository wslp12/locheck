/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { atom, atomFamily, selector } from 'recoil';
import { RECOIL_KEY } from '../enum';

const localStorageEffect = (key: any) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any, _: any, isReset: any) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export type Todo = {
  name:
    | '카오스던전'
    | '가디언'
    | '에포나'
    | '발탄[노말]'
    | '발탄[하드]'
    | '비아키스[노말]'
    | '비아키스[하드]'
    | '쿠쿠세이튼'
    | '아브렐슈드[노말][1-2]'
    | '아브렐슈드[노말][3-4]'
    | '아브렐슈드[노말][5-6]'
    | '아브렐슈드[하드][1-2]'
    | '아브렐슈드[하드][3-4]'
    | '아브렐슈드[하드][5-6]'
    | '카양겔[노말]'
    | '카양겔[하드][1]'
    | '카양겔[하드][2]'
    | '카양겔[하드][3]'
    | '일리아칸[노말][1-3]'
    | '일리아칸[하드][1-3]';
  level: number;
  done: boolean;
  doneTime: string;
};

type TodoId = string;

// const todoId = atom({
//   key: RECOIL_KEY.TODO_ID,
//   default: NaN,
//   effects: [localStorageEffect(RECOIL_KEY.TODO_ID)],
// });

// const todoIdState = atom({
//   key: RECOIL_KEY.TODO_IDS,
//   default: <TodoId[]>[],
//   effects: [localStorageEffect(RECOIL_KEY.TODO_IDS)],
// });

const TODO_LIST: Todo[] = [
  { done: false, level: 0, name: '카오스던전', doneTime: '' },
  { done: false, level: 0, name: '가디언', doneTime: '' },
  { done: false, level: 0, name: '에포나', doneTime: '' },
  { done: false, level: 1415, name: '발탄[노말]', doneTime: '' },
  {
    done: false,
    level: 1430,
    name: '비아키스[노말]',
    doneTime: '',
  },
  { done: false, level: 1445, name: '발탄[하드]', doneTime: '' },
  {
    done: false,
    level: 1460,
    name: '비아키스[하드]',
    doneTime: '',
  },
  { done: false, level: 1470, name: '쿠쿠세이튼', doneTime: '' },
  { done: false, level: 1475, name: '카양겔[노말]', doneTime: '' },
  { done: false, level: 1520, name: '카양겔[하드][1]', doneTime: '' },
  { done: false, level: 1560, name: '카양겔[하드][2]', doneTime: '' },
  { done: false, level: 1580, name: '카양겔[하드][3]', doneTime: '' },
  {
    done: false,
    level: 1490,
    name: '아브렐슈드[노말][1-2]',
    doneTime: '',
  },
  {
    done: false,
    level: 1500,
    name: '아브렐슈드[노말][3-4]',
    doneTime: '',
  },
  {
    done: false,
    level: 1520,
    name: '아브렐슈드[노말][5-6]',
    doneTime: '',
  },
  {
    done: false,
    level: 1540,
    name: '아브렐슈드[하드][5-6]',
    doneTime: '',
  },
  {
    done: false,
    level: 1550,
    name: '아브렐슈드[하드][5-6]',
    doneTime: '',
  },
  {
    done: false,
    level: 1560,
    name: '아브렐슈드[하드][5-6]',
    doneTime: '',
  },
  {
    done: false,
    level: 1580,
    name: '일리아칸[노말][1-3]',
    doneTime: '',
  },
  {
    done: false,
    level: 1600,
    name: '일리아칸[하드][1-3]',
    doneTime: '',
  },
];

const todoState = atom({
  key: RECOIL_KEY.TODO_LIST,
  default: <{ id: TodoId; list: Todo[] }[]>[],
  effects: [localStorageEffect(RECOIL_KEY.TODO_LIST)],
});

const todoItem = selector({
  key: 'TODO_ITEM',
  get: ({ get }) => (id: TodoId) => {
    const todoList = get(todoState);
    console.log(todoList);
    const idx = todoList.findIndex((todo) => todo.id === id);
    return todoList[idx];
  },
});

export { todoState, TODO_LIST, todoItem, TodoId };
