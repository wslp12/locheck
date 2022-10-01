/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

type AddItemModal = {
  state: boolean;
  showModal: () => void;
  hideModal: () => void;
};
export const AddItemModalContext = React.createContext<AddItemModal | null>(
  null,
);

function LoginModalProvider({ children }: { children: any }) {
  const [isShow, setIsShow] = useState(false);

  const showModal = () => {
    setIsShow(true);
  };

  const hideModal = () => {
    setIsShow(false);
  };

  return (
    <AddItemModalContext.Provider
      value={{
        state: isShow,
        showModal,
        hideModal,
      }}
    >
      {children}
    </AddItemModalContext.Provider>
  );
}

export default LoginModalProvider;
