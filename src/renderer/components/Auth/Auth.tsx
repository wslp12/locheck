/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { produce } from 'immer';
import dayjs from 'dayjs';
// import { authState } from '../../recoil/auth';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { QUERY_KEY, RECOIL_KEY } from '../../enum';
import { todoState } from '../../recoil/todo';
import MainLayout from '../Layout/MainLayout';
import useGetUserInfo from '../../api/get-user';
import { userAtomState } from '../../recoil/user.state';
import LoginP from '../Login/LoginP';
import LoginBC from '../LoginB/LoginBC';
import characterLsitAtomState from '../../recoil/character-list.state';

// import { useQueryClient } from '@tanstack/react-query';

function Auth(props: any) {
  const { children } = props;
  const navigate = useNavigate();
  // const location = useLocation();
  const characterLsitState = useRecoilValue(characterLsitAtomState);
  const userState = useRecoilValue(userAtomState);

  // useEffect(() => {
  //   if (characterLsitState.length > 0 || userState !== null) {
  //     navigate('/dashboard');
  //   }
  // }, [characterLsitState]);

  // return <MainLayout />;
  return (
    <>
      {characterLsitState.length === 0 && userState === null && (
        <div>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => 1201 }} open>
            <LoginBC />
          </Backdrop>
        </div>
      )}
      {children}
    </>
  );
  // return <Outlet />;
}

export default Auth;
