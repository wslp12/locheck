/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

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

const sortAtomState = atom({
  key: 'sort-setting',
  default: true,
  effects: [localStorageEffect('sort-setting')],
});

export { sortAtomState };
