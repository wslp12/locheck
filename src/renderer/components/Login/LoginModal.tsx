import React, { useState, useRef, useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import LoginP from './LoginP';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { userAtomState } from '../../recoil/user.state';
import useGetUserInfo from '../../api/get-user';
import { LoginModalContext } from './LoginModalProvider';
import { SplashContext } from '../Splash/SplashProvider';

function LoginModal() {
  const loginModalState = useContext(LoginModalContext);
  const splashState = useContext(SplashContext);
  if (loginModalState === null || splashState === null) return <></>;

  const { hideModal, showModal, state } = loginModalState;
  const {
    hideModal: hideSplashModal,
    showModal: showSplashModal,
  } = splashState;

  const [idValue, setIdValue] = useState('');

  const { data, refetch } = useGetUserInfo(idValue);

  const setUserState = useSetRecoilState(userAtomState);

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '') return;
    showSplashModal();

    refetch().then((res) => {
      hideSplashModal();
      if (res.data?.statusCode === 404 || !res.data?.token) {
        toast.error('서버비용이 없어서 죽어 있습니다.');
        return;
      }
      toast.success('로그인에 성공 했습니다.');

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
