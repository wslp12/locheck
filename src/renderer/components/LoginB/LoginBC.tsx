/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HandleClickLogin, HandleIdChange } from './login.type';
import LoginBP from './LoginBP';
import useGetCharacterList from '../../api/get-character-list.api';
import characterLsitAtomState from '../../recoil/character-list.state';
import usePostCharacterList from '../../api/post-character-list.api';
import { SplashContext } from '../Splash/SplashProvider';
import useGetUserInfo from '../../api/get-user.api';
import { userAtomState } from '../../recoil/user.state';

function LoginBC() {
  const splashState = useContext(SplashContext);
  if (splashState === null) return <></>;

  const { hideModal, showModal } = splashState;

  const [characterName, setCharacterName] = useState('');
  const [tokenValue, setTokenValue] = useState('');

  const setCharacterList = useSetRecoilState(characterLsitAtomState);
  const setUserState = useSetRecoilState(userAtomState);

  const navigate = useNavigate();

  const { data: userInfoData, refetch: getUserInfoRefetch } = useGetUserInfo(
    tokenValue,
  );
  const { data, refetch } = useGetCharacterList(characterName, tokenValue);
  const { mutateAsync } = usePostCharacterList();

  const handleClickLogin: HandleClickLogin = async () => {
    if (characterName === '') return;
    if (tokenValue !== '') {
      showModal();

      getUserInfoRefetch().then((res) => {
        hideModal();
        if ((res.data as any)?.statusCode === 404 || !res.data?.token) {
          toast.error('서버비용이 없어서 죽어 있습니다.');
          return;
        }
        toast.success('로그인에 성공 했습니다.');

        hideModal();
        setUserState(res.data);
        navigate('/dashboard');
      });
    } else {
      await refetch().then(async (res) => {
        if (!res.data) return;
        if ('statusCode' in res.data && res.data?.statusCode === 404) {
          const isYes = confirm(
            `${res.data.message} 해당 캐릭터 명으로 로스트아크에서 리스트를 불러와 저장하시겠습니까?`,
          );
          if (!isYes) return;
          showModal();
          await mutateAsync(characterName, {
            onSuccess: (postRes: any) => {
              hideModal();
              toast.success(
                '캐릭터 리스트를 성공적으로 저장했습니다. 리스트 불러오기를 진행 해주세요.',
              );
            },
            onError: (postRes: any) => {
              hideModal();
            },
          });
        } else if ('concat' in res.data) {
          toast.success('성공적으로 캐릭터 리스트를 불러왔습니다.');
          setCharacterList(res.data);
          navigate('/dashboard');
        }
      });
    }
  };

  const handleIdChange: HandleIdChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleTokenValueChange: HandleIdChange = (e) => {
    setTokenValue(e.target.value);
  };

  return (
    <LoginBP
      onClickLogin={handleClickLogin}
      onChangeCharacterName={handleIdChange}
      onChangeTokenValue={handleTokenValueChange}
      characterName={characterName}
      tokenValue={tokenValue}
    />
  );
}

export default LoginBC;
