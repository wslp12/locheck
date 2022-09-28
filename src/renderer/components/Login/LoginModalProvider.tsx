/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

type LoginModal = {
  state: boolean;
  showModal: () => void;
  hideModal: () => void;
};
export const LoginModalContext = React.createContext<LoginModal | null>(null);

function LoginModalProvider({ children }: { children: any }) {
  const [isShow, setIsShow] = useState(false);

  const showModal = () => {
    setIsShow(true);
  };

  const hideModal = () => {
    setIsShow(false);
  };

  return (
    <LoginModalContext.Provider
      value={{
        state: isShow,
        showModal,
        hideModal,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
}

export default LoginModalProvider;
