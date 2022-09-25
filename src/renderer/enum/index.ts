/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
const enum RECOIL_KEY {
  CHRACTER_LIST = 'CHRACTER_LIST',
  LOGIN_MODE = 'LOGIN_MODE',
  USER = 'USER',
  TODO_LIST = 'TODO_LIST',
  // TODO_IDS = 'TODO_IDS',
  // TODO_ID = 'TODO_ID',
}

const enum QUERY_KEY {
  USER_INFO = 'USER_INFO',
  CHRAACTER_LIST = 'CHRAACTER_LIST',
}

const enum LOGIN_MODE {
  OFF_LOGIN = 'OFF_LOGIN',
  ON_LOGIN = 'ON_LOGIN',
}

export { RECOIL_KEY, QUERY_KEY, LOGIN_MODE };
