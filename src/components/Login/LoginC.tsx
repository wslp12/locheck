import React, { useState } from 'react';
import LoginP from './LoginP';
import { HandleClickLogin, HandleIdChange } from './login.type';

function LoginC() {
  const [idValue, setIdValue] = useState('');

  const handleClickLogin: HandleClickLogin = () => {
    console.log(idValue);
  };

  const handleIdChange: HandleIdChange = (e) => {
    setIdValue(e.target.value);
  };

  return (
    <LoginP
      onClickLogin={handleClickLogin}
      onChangeId={handleIdChange}
      idValue={idValue}
    />
  );
}

export default LoginC;
