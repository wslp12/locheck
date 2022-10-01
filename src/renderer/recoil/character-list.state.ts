import { atom } from 'recoil';
import { RECOIL_KEY } from '../enum';

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

export type Character = {
  display: boolean;
  groupSetName: string;
  itemLevel: number;
  job: string;
  jobIcon: string;
  jobProfileSrc: string;
  level: number;
  name: string;
  profileSrc: string;
};

const characterLsitAtomState = atom({
  key: RECOIL_KEY.CHARACTER_LIST,
  default: <Character[]>[],
  effects: [localStorageEffect(RECOIL_KEY.CHARACTER_LIST)],
});

export default characterLsitAtomState;
