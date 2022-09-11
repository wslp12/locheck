/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { RECOIL_KEY } from '../enum';

const authState = atom({
  key: RECOIL_KEY.AUTH,
  default: '',
});

export { authState };
