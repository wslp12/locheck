import React, { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import LoginP from './LoginP';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { Auth, authState } from '../../recoil/auth';
import useGetUserInfo from '../../api/get-user';

// import useGetChars from '../../api/get-chars';

function LoginC() {
  const [idValue, setIdValue] = useState('');

  const navigate = useNavigate();

  const { refetch } = useGetUserInfo(idValue);

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '') return;
    // if (!(globalThis as any).ipc) return;

    // const result: Auth[] = JSON.parse(
    //   (globalThis as any).ipc.sendSync('login', idValue),
    // );

    refetch().then((res) => {
      console.log('@@@@@@@', res);
      if (res.data?.status !== 200) return;
      console.log('@@@@@@@333', res);
      navigate('/dashboard');
    });
  };

  const handleIdChange: HandleIdChange = (e) => {
    setIdValue(e.target.value);
  };

  return (
    <LoginP
      onClickLogin={handleClickLogin}
      onChangeId={handleIdChange}
      idValue={idValue}
    />
  );
}

export default LoginC;
