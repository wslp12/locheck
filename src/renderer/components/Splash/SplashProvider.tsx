/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

type Splash = {
  state: boolean;
  showModal: () => void;
  hideModal: () => void;
};
export const SplashContext = React.createContext<Splash | null>(null);

function SplashProvider({ children }: { children: any }) {
  const [isShow, setIsShow] = useState(false);

  const showModal = () => {
    setIsShow(true);
  };

  const hideModal = () => {
    setIsShow(false);
  };

  return (
    <SplashContext.Provider
      value={{
        state: isShow,
        showModal,
        hideModal,
      }}
    >
      {children}
    </SplashContext.Provider>
  );
}

export default SplashProvider;
