/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { atom, atomFamily, selector } from 'recoil';
import { RECOIL_KEY } from '../enum';
import aibs from '../assets/aibs.png';
import argo from '../assets/argo.png';
import av12 from '../assets/av12.png';
import av34 from '../assets/av34.png';
import av56 from '../assets/av56.png';
import avh12 from '../assets/avh12.png';
import avh34 from '../assets/avh34.png';
import avh56 from '../assets/avh56.png';
import chaosd from '../assets/chaosd.png';
import epona from '../assets/epona.png';
import gad from '../assets/gad.png';
import val from '../assets/val.png';
import val2 from '../assets/val2.png';
import via from '../assets/via.png';
import via2 from '../assets/via2.png';
import kuku from '../assets/kuku.png';
import kayang from '../assets/kayang.png';

const localStorageEffect = (key: any) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any, _: any, isReset: any) => {
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      console.log(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

type TodoName =
  | '카오스던전'
  | '가디언'
  | '에포나'
  | '아르고스'
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

type TodoGroupName =
  | '카오스던전'
  | '가디언'
  | '에포나'
  | '아르고스'
  | '발탄'
  | '비아키스'
  | '쿠쿠세이튼'
  | '아브렐슈드[1-2]'
  | '아브렐슈드[3-4]'
  | '아브렐슈드[5-6]'
  | '카양겔'
  | '일리아칸[1-3]';

export type Todo = {
  name: TodoName;
  level: number;
  done: boolean;
  doneTime: string;
  display: boolean;
  srcName: string;
  gold: number;
  groupName: TodoGroupName;
};

type TodoId = string;

const TODO_LIST: Todo[] = [
  {
    done: false,
    level: 0,
    name: '카오스던전',
    doneTime: '',
    display: true,
    srcName: chaosd,
    gold: 0,
    groupName: '카오스던전',
  },
  {
    done: false,
    level: 0,
    name: '가디언',
    doneTime: '',
    display: true,
    srcName: gad,
    gold: 0,
    groupName: '가디언',
  },
  {
    done: false,
    level: 0,
    name: '에포나',
    doneTime: '',
    display: true,
    srcName: epona,
    gold: 0,
    groupName: '에포나',
  },
  {
    done: false,
    level: 1370,
    name: '아르고스',
    doneTime: '',
    display: true,
    srcName: argo,
    gold: 1600,
    groupName: '아르고스',
  },
  {
    done: false,
    level: 1415,
    name: '발탄[노말]',
    doneTime: '',
    display: true,
    srcName: val,
    gold: 2500,
    groupName: '발탄',
  },
  {
    done: false,
    level: 1430,
    name: '비아키스[노말]',
    doneTime: '',
    display: true,
    srcName: via,
    gold: 2500,
    groupName: '비아키스',
  },
  {
    done: false,
    level: 1445,
    name: '발탄[하드]',
    doneTime: '',
    display: true,
    srcName: val2,
    gold: 4500,
    groupName: '발탄',
  },
  {
    done: false,
    level: 1460,
    name: '비아키스[하드]',
    doneTime: '',
    display: true,
    srcName: via2,
    gold: 4500,
    groupName: '비아키스',
  },
  {
    done: false,
    level: 1470,
    name: '쿠쿠세이튼',
    doneTime: '',
    display: true,
    srcName: kuku,
    gold: 4500,
    groupName: '쿠쿠세이튼',
  },
  {
    done: false,
    level: 1475,
    name: '카양겔[노말]',
    doneTime: '',
    display: true,
    srcName: kayang,
    gold: 0,
    groupName: '카양겔',
  },
  {
    done: false,
    level: 1520,
    name: '카양겔[하드][1]',
    doneTime: '',
    display: true,
    srcName: kayang,
    gold: 0,
    groupName: '카양겔',
  },
  {
    done: false,
    level: 1560,
    name: '카양겔[하드][2]',
    doneTime: '',
    display: true,
    srcName: kayang,
    gold: 0,
    groupName: '카양겔',
  },
  {
    done: false,
    level: 1580,
    name: '카양겔[하드][3]',
    doneTime: '',
    display: true,
    srcName: kayang,
    gold: 0,
    groupName: '카양겔',
  },
  {
    done: false,
    level: 1490,
    name: '아브렐슈드[노말][1-2]',
    doneTime: '',
    display: true,
    srcName: av12,
    gold: 5000,
    groupName: '아브렐슈드[1-2]',
  },
  {
    done: false,
    level: 1500,
    name: '아브렐슈드[노말][3-4]',
    doneTime: '',
    display: true,
    srcName: av34,
    gold: 1500,
    groupName: '아브렐슈드[3-4]',
  },
  {
    done: false,
    level: 1540,
    name: '아브렐슈드[하드][1-2]',
    doneTime: '',
    display: true,
    srcName: avh12,
    gold: 5500,
    groupName: '아브렐슈드[1-2]',
  },
  {
    done: false,
    level: 1550,
    name: '아브렐슈드[하드][3-4]',
    doneTime: '',
    display: true,
    srcName: avh34,
    gold: 2000,
    groupName: '아브렐슈드[3-4]',
  },
  {
    done: false,
    level: 1520,
    name: '아브렐슈드[노말][5-6]',
    doneTime: '',
    display: true,
    srcName: av56,
    gold: 2500,
    groupName: '아브렐슈드[5-6]',
  },
  {
    done: false,
    level: 1560,
    name: '아브렐슈드[하드][5-6]',
    doneTime: '',
    display: true,
    srcName: avh56,
    gold: 3000,
    groupName: '아브렐슈드[5-6]',
  },
  {
    done: false,
    level: 1580,
    name: '일리아칸[노말][1-3]',
    doneTime: '',
    display: true,
    srcName: '',
    gold: 5500,
    groupName: '일리아칸[1-3]',
  },
  {
    done: false,
    level: 1600,
    name: '일리아칸[하드][1-3]',
    doneTime: '',
    display: true,
    srcName: '',
    gold: 6500,
    groupName: '일리아칸[1-3]',
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
