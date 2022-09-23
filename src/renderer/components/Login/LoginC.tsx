import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import LoginP from './LoginP';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { Auth, authState } from '../../recoil/auth';

// import useGetChars from '../../api/get-chars';

function LoginC() {
  const [idValue, setIdValue] = useState('');
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleClickLogin: HandleClickLogin = () => {
    // if (!(globalThis as any).ipc) return;

    // const result: Auth[] = JSON.parse(
    //   (globalThis as any).ipc.sendSync('login', idValue),
    // );

    const encodeId = encodeURIComponent(idValue);
    // fetch(`http://lochek.com:3000/parse/${encodeId}`, {
    fetch(`http://localhost:3000/parse/${encodeId}`, {
      method: 'POST',
    }).then((res) => {
      res.json().then((result) => {
        setAuth(result);
        navigate('/dashboard');
      });
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
