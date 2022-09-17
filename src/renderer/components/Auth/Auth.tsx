import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';
import { authState } from '../../recoil/auth';

function Auth() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth === undefined || auth === null || auth.length === 0) {
      console.log(1);
      navigate('login');
    } else {
      navigate('home');
    }
  }, [auth]);

  return <Outlet />;
}

export default Auth;
