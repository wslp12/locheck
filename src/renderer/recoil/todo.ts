/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { atom, atomFamily, selector } from 'recoil';
import { RECOIL_KEY } from '../enum';
// import aibs from '../assets/aibs.png';
// import argo from '../assets/argo.png';
// import av12 from '../assets/av12.png';
// import av34 from '../assets/av34.png';
// import av56 from '../assets/av56.png';
// import avh12 from '../assets/avh12.png';
// import avh34 from '../assets/avh34.png';
// import avh56 from '../assets/avh56.png';
// import chaosd from '../assets/chaosd.png';
// import epona from '../assets/epona.png';
// import gad from '../assets/gad.png';
// import val from '../assets/val.png';
// import val2 from '../assets/val2.png';
// import via from '../assets/via.png';
// import via2 from '../assets/via2.png';
// import kuku from '../assets/kuku.png';
// import kayang from '../assets/kayang.png';

const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
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

export type Raid = {
  name: string;
  srcName: string;
  level: number;
  gold: number;
  groupName: string;
};

export type Todo = { done: boolean; doneTime: string; display: boolean } & Raid;

type TodoId = string;

const todoState = atom({
  key: RECOIL_KEY.TODO_LIST,
  default: <{ id: TodoId; list: Todo[] }[]>[],
  effects: [localStorageEffect(RECOIL_KEY.TODO_LIST)],
});

const todoItem = selector({
  key: 'TODO_ITEM',
  get:
    ({ get }) =>
    (id: TodoId) => {
      const todoList = get(todoState);
      console.log(todoList);
      const idx = todoList.findIndex((todo) => todo.id === id);
      return todoList[idx];
    },
});

export { todoState, todoItem, TodoId };
