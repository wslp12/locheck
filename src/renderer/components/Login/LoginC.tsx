import React, { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import LoginP from './LoginP';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { userAtomState } from '../../recoil/user.state';
import useGetUserInfo from '../../api/get-user';

function LoginC() {
  const [idValue, setIdValue] = useState('');

  const setUserStaet = useSetRecoilState(userAtomState);

  const navigate = useNavigate();

  const { data, refetch } = useGetUserInfo(idValue);

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '') return;
    // if (!(globalThis as any).ipc) return;

    // const result: Auth[] = JSON.parse(
    //   (globalThis as any).ipc.sendSync('login', idValue),
    // );

    refetch().then((res) => {
      console.log('@@@@@@@', res, data);
      if (res.data?.statusCode === 404) return;
      console.log('@@@@@@@333', res, data);
      setUserStaet(data);
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
