import React from 'react';
import { Button, TextField } from '@mui/material';
import { LoginBProps } from './login.type';

function LoginBP(props: LoginBProps) {
  const {
    onClickLogin,
    onChangeCharacterName,
    characterName,
    onChangeTokenValue,
    tokenValue,
  } = props;
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
      <div
        className="h-full flex flex-col items-center justify-center gap-3"
        style={{
          backgroundColor: '#fff',
          height: '25%',
          width: '20%',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0px 0px 20px -10px black',
        }}
      >
        <TextField
          required
          value={characterName}
          onChange={onChangeCharacterName}
          id="standard-basic"
          label="캐릭터명을 입력 해주세요(필수값)"
          variant="standard"
          className="w-full"
        />
        <TextField
          value={tokenValue}
          onChange={onChangeTokenValue}
          id="standard-basic"
          label="토큰을 입력해주세요"
          variant="filled"
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
