import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';
import { authState } from '../../recoil/auth';

function Auth() {
  const navigate = useNavigate();
  const [auth] = useRecoilState(authState);

  console.log(auth);

  useEffect(() => {
    if (auth === '' || auth === undefined || auth === 'null') {
      navigate('login');
    }
  }, [auth]);

  return <Outlet />;
}

export default Auth;
