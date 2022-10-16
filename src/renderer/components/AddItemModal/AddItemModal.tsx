import React, { useState, useRef, useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { QueryClient, useQueryClient } from '@tanstack/react-query';

import { HandleClickLogin, HandleIdChange } from './add-item-modal.type';
import { userAtomState } from '../../recoil/user.state';
import { AddItemModalContext } from './AddItemModalProvider';
import AddItemModalP from './AddItemModalP';
import usePostOrganization from '../../api/post-organization.api';
import { SplashContext } from '../Splash/SplashProvider';

function AddItemModal() {
  const navi = useNavigate();
  const addItemModalState = useContext(AddItemModalContext);
  const splashState = useContext(SplashContext);
  const queryClient = useQueryClient();
  if (addItemModalState === null || splashState === null) return <></>;

  const { hideModal, state } = addItemModalState;
  const {
    hideModal: hideSplashModal,
    showModal: showSplashModal,
  } = splashState;

  const [idValue, setIdValue] = useState('');

  const userState = useRecoilValue(userAtomState);

  const { mutate: postOrganization } = usePostOrganization();

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '' || !userState) return;
    showSplashModal();

    postOrganization(
      {
        name: userState.name,
        gName: idValue,
      },
      {
        onSuccess: (res) => {
          hideSplashModal();
          if (res.statusCode) {
            toast.error(`윤지용이 돈을 안 줘서 서버가 죽었습니다.`);
          } else {
            toast.success(`${idValue} 계정을 성공적으로 등록 했습니다.`);
            navi(`/character/${idValue}`);
            queryClient.invalidateQueries(['ORG_LIST']);
          }
          hideModal();
        },
      },
    );
  };

  const handleIdChange: HandleIdChange = (e) => {
    setIdValue(e.target.value);
  };

  return state ? (
    <AddItemModalP
      onClickLogin={handleClickLogin}
      onChangeId={handleIdChange}
      hideModal={hideModal}
      idValue={idValue}
    />
  ) : (
    <></>
  );
}

export default AddItemModal;
