/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { HandleClickLogin, HandleIdChange } from './login.type';
import { userAtomState } from '../../recoil/user.state';
import LoginBP from './LoginBP';
import useGetCharacterList from '../../api/get-character-list.api';
import characterLsitAtomState from '../../recoil/character-list.state';
import usePostCharacterList from '../../api/post-character-list.api';
import { SplashContext } from '../Splash/SplashProvider';

function LoginBC() {
  const splashState = useContext(SplashContext);
  if (splashState === null) return <></>;

  const { hideModal, showModal, state } = splashState;

  console.log('%cshowModal', 'color: red', showModal);

  const [idValue, setIdValue] = useState('');

  const setCharacterList = useSetRecoilState(characterLsitAtomState);

  const navigate = useNavigate();

  const { data, refetch } = useGetCharacterList(idValue);
  const { mutateAsync } = usePostCharacterList();

  const handleClickLogin: HandleClickLogin = async () => {
    if (idValue === '') return;
    await refetch().then(async (res) => {
      console.log('@@@@@@@', res, data);
      if (res.data?.statusCode === 404) {
        const isYes = confirm(
          `${res.data.message} 해당 캐릭터 명으로 로스트아크에서 리스트를 불러와 저장하시겠습니까?`,
        );
        console.log('%cisYes', 'color: red', isYes);
        if (!isYes) return;
        showModal();
        await mutateAsync(idValue, {
          onSuccess: (postRes: any) => {
            hideModal();
            alert(
              '캐릭터 리스트를 성공적으로 저장했습니다. 리스트 불러오기를 진행 해주세요.',
            );
          },
          onError: (postRes: any) => {
            hideModal();
          },
        });
      } else {
        console.log('@@@@@@@333', res, data);
        setCharacterList(res.data);
        navigate('/dashboard');
      }
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
