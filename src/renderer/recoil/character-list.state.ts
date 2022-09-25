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
  key: RECOIL_KEY.CHRACTER_LIST,
  default: [],
  effects: [localStorageEffect(RECOIL_KEY.CHRACTER_LIST)],
});

export default characterLsitAtomState;
