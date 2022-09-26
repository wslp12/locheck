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

const characterLsitAtomState = atom({
  key: RECOIL_KEY.CHARACTER_LIST,
  default: <
    {
      display: boolean;
      groupSetName: string;
      itemLevel: number;
      job: string;
      jobIcon: string;
      jobProfileSrc: string;
      level: number;
      name: string;
      profileSrc: string;
    }[]
  >[],
  effects: [localStorageEffect(RECOIL_KEY.CHARACTER_LIST)],
});

export default characterLsitAtomState;
