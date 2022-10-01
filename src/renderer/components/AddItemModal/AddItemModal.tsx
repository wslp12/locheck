import React, { useState, useRef, useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { HandleClickLogin, HandleIdChange } from './add-item-modal.type';
import { userAtomState } from '../../recoil/user.state';
import useGetUserInfo from '../../api/get-user';
import { AddItemModalContext } from './AddItemModalProvider';
import AddItemModalP from './AddItemModalP';
import usePostOrganization from '../../api/post-organization.api';

function AddItemModal() {
  const navi = useNavigate();
  const addItemModalState = useContext(AddItemModalContext);
  if (addItemModalState === null) return <></>;

  const { hideModal, state } = addItemModalState;

  const [idValue, setIdValue] = useState('');

  const userState = useRecoilValue(userAtomState);

  const { mutate: postOrganization } = usePostOrganization();

  const handleClickLogin: HandleClickLogin = () => {
    if (idValue === '' || !userState) return;

    postOrganization(
      {
        name: userState.name,
        gName: idValue,
      },
      {
        onSuccess: (res) => {
          console.log(res);
          // .then((res) => {
          //   console.log(res);
          //   if (res.data?.statusCode === 404) {
          //     toast.error('사용자가 계정 등록을 하지 않았습니다');
          //   } else {
          hideModal();
          navi(`/character/${idValue}`);
          //   }

          //   // setUserState(res.data);
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
