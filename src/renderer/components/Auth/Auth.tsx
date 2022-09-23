/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { produce } from 'immer';
import dayjs from 'dayjs';
// import { authState } from '../../recoil/auth';
import { QUERY_KEY, RECOIL_KEY } from '../../enum';
import { todoState } from '../../recoil/todo';
import MainLayout from '../Layout/MainLayout';
import useGetUserInfo from '../../api/get-user';
import { userAtomState } from '../../recoil/user.state';
// import { useQueryClient } from '@tanstack/react-query';

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userAtomState);

  useEffect(() => {
    console.log('asdf', location);
    if (user === null) {
      navigate('/login');
    }
    // else if (navigate)
  }, [user]);

  return <MainLayout />;
}

export default Auth;
