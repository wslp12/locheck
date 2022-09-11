import React from 'react';
import { LoginPP } from './login.type';

function LoginP(props: LoginPP) {
  const { onClickLogin, onChangeId, idValue } = props;
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-1">
      <input
        value={idValue}
        type="text"
        placeholder="아이디를 입력 해주세요"
        style={{
          border: '1px solid black',
          borderRadius: '3px',
        }}
        onChange={onChangeId}
      />
      <button
        type="button"
        style={{
          border: '1px solid black',
          borderRadius: '3px',
        }}
        onClick={onClickLogin}
      >
        로그인
      </button>
    </div>
  );
}

export default LoginP;
