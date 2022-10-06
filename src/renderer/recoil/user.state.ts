/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { RECOIL_KEY } from '../enum';
import { Character } from './character-list.state';
import { Todo } from './todo';

const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
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

const userAtomState = atom({
  key: RECOIL_KEY.USER,
  default: <
    {
      name: string;
      token: string;
      todoList: Todo[];
      characterList: Character[];
    } | null
  >null,
  effects: [localStorageEffect(RECOIL_KEY.USER)],
});

export { userAtomState };
