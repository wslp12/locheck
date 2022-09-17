import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';
import { authState } from '../../recoil/auth';
import { RECOIL_KEY } from '../../enum';

function Auth() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth === undefined || auth === null || auth.length === 0) {
      navigate('/login');
    }
  }, [auth]);

  useEffect(() => {
    if ((globalThis as any).ipc) {
      (globalThis as any).ipc.on('moveHide', () => {
        navigate('/char-setting');
      });
      (globalThis as any).ipc.on('moveHome', () => {
        navigate('/home');
      });
      (globalThis as any).ipc.on('moveRade', () => {
        navigate('/char-rade-setting');
      });
      (globalThis as any).ipc.on('logout', () => {
        globalThis.localStorage.clear();
        globalThis.location.reload();
      });
      (globalThis as any).ipc.on('homework', () => {
        globalThis.localStorage.removeItem(RECOIL_KEY.TODO_LIST);
        globalThis.location.reload();
      });
    }
  }, []);

  return <Outlet />;
}

export default Auth;
