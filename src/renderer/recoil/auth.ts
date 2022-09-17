/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { RECOIL_KEY, STORAGE_KEY } from '../enum';
// import { Todo, TodoId } from './todo';

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

type Auth = {
  profileSrc: string;
  jobIcon: string;
  jobProfileSrc: string;
  job: string;
  level: number;
  itemLevel: number;
  name: string;
  display: boolean;
};

const authState = atom({
  key: RECOIL_KEY.AUTH,
  default: <Auth[]>[],
  effects: [localStorageEffect(STORAGE_KEY.AUTH)],
});

export { authState, Auth };
