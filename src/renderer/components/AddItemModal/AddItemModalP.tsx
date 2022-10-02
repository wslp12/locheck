/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Backdrop, Button, TextField } from '@mui/material';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoginPP } from './add-item-modal.type';

function AddItemModalP(props: any) {
  const { onClickLogin, onChangeId, idValue, hideModal } = props;
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => 1201 }}
      open
      onClick={hideModal}
    >
      <div className="h-full w-full flex flex-col items-center justify-center gap-3">
        <div
          className="h-full flex flex-col items-center justify-center gap-3"
          style={{
            backgroundColor: '#fff',
            height: '15%',
            width: '20%',
            padding: '2%',
            borderRadius: '0.5rem',
            boxShadow: '0px 0px 20px -10px black',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <TextField
            id="standard-basic"
            label="토큰이름"
            variant="standard"
            className="w-full"
            value={idValue}
            onChange={onChangeId}
          />
          <LoadingButton
            size="small"
            onClick={onClickLogin}
            loading={false}
            loadingIndicator="Loading…"
            variant="outlined"
            className="w-full"
            // style={{
            //   width: '100%',
            // }}
          >
            로그인
          </LoadingButton>
        </div>
      </div>
    </Backdrop>
  );
}

export default AddItemModalP;
