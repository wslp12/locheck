import React, { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { userAtomState } from '../../recoil/user.state';
import LoginBP from './LoginBP';
import useGetCharacterList from '../../api/get-character-list';
import characterLsitAtomState from '../../recoil/character-list.state';

function LoginBC() {
  const [idValue, setIdValue] = useState('');

  const setCharacterList = useSetRecoilState(characterLsitAtomState);

  const navigate = useNavigate();

  const { data, refetch } = useGetCharacterList(idValue);

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '') return;

    refetch().then((res) => {
      console.log('@@@@@@@', res, data);
      if (res.data?.statusCode === 404) return;
      console.log('@@@@@@@333', res, data);
      setCharacterList(res.data);
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
