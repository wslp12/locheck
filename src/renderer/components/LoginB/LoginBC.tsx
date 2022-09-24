import React, { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { userAtomState } from '../../recoil/user.state';
import useGetUserInfo from '../../api/get-user';
import LoginBP from './LoginBP';

function LoginBC() {
  const [idValue, setIdValue] = useState('');

  const setUserStaet = useSetRecoilState(userAtomState);

  const navigate = useNavigate();

  const { data, refetch } = useGetUserInfo(idValue);

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '') return;

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
    <LoginBP
      onClickLogin={handleClickLogin}
      onChangeId={handleIdChange}
      idValue={idValue}
    />
  );
}

export default LoginBC;
