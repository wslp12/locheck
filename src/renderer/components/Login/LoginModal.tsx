import React, { useState, useRef, useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import LoginP from './LoginP';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { userAtomState } from '../../recoil/user.state';
import useGetUserInfo from '../../api/get-user';
import { LoginModalContext } from './LoginModalProvider';

function LoginModal() {
  const loginModalState = useContext(LoginModalContext);
  if (loginModalState === null) return <></>;

  const { hideModal, showModal, state } = loginModalState;

  const [idValue, setIdValue] = useState('');

  const { data, refetch } = useGetUserInfo(idValue);

  const setUserState = useSetRecoilState(userAtomState);

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '') return;

    refetch().then((res) => {
      if (res.data?.statusCode === 404 || !res.data?.token) return;

      console.log(res.data);
      hideModal();
      setUserState(res.data);
    });
  };

  const handleIdChange: HandleIdChange = (e) => {
    setIdValue(e.target.value);
  };

  return state ? (
    <LoginP
      onClickLogin={handleClickLogin}
      onChangeId={handleIdChange}
      hideModal={hideModal}
      idValue={idValue}
    />
  ) : (
    <></>
  );
}

export default LoginModal;
