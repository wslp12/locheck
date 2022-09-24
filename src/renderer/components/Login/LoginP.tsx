import { Button, TextField } from '@mui/material';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoginPP } from './login.type';

function LoginP(props: any) {
  // const { onClickLogin, onChangeId, idValue } = props;
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
      <div
        className="h-full flex flex-col items-center justify-center gap-3"
        style={{
          backgroundColor: '#fff',
          height: '30%',
          width: '30%',
          padding: '6%',
          borderRadius: '0.5rem',
        }}
      >
        <TextField
          id="standard-basic"
          label="이메일"
          variant="standard"
          className="w-full"
        />
        <TextField
          className="w-full"
          id="standard-password-input"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <LoadingButton
          size="small"
          // onClick={onClickLogin}
          loading={false}
          loadingIndicator="Loading…"
          variant="outlined"
          className="w-full"
          // style={{
          //   width: '100%',
          // }}
        >
          로그인
        </LoadingButton>
        <Button
          className="w-full"
          size="small"
          variant="outlined"
          // style={{
          //   width: '100%',
          // }}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}

export default LoginP;
