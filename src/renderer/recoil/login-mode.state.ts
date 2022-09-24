/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { LOGIN_MODE, RECOIL_KEY } from '../enum';

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

const userAtomState = atom({
  key: RECOIL_KEY.LOGIN_MODE,
  default: <LOGIN_MODE>LOGIN_MODE.OFF_LOGIN,
  effects: [localStorageEffect(RECOIL_KEY.LOGIN_MODE)],
});

export { userAtomState };
