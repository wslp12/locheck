import React from 'react';
import { Button, TextField } from '@mui/material';
import { LoginBProps } from './login.type';

function LoginBP(props: LoginBProps) {
  const { onClickLogin, onChangeId, idValue } = props;
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
          boxShadow: '0px 0px 20px -10px black',
        }}
      >
        <TextField
          value={idValue}
          onChange={onChangeId}
          id="standard-basic"
          label="캐릭터명을 입력 해주세요"
          variant="standard"
          className="w-full"
        />
        <Button
          className="w-full"
          size="small"
          variant="outlined"
          onClick={onClickLogin}
        >
          정보 불러오기
        </Button>
      </div>
    </div>
  );
}

export default LoginBP;
