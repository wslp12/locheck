import React, { useContext } from 'react';
import { SplashContext } from './SplashProvider';

function Splash() {
  const splashState = useContext(SplashContext);
  if (splashState === null) return <></>;

  const { hideModal, showModal, state } = splashState;

  console.log('%cstate', 'color: purple', state);

  return state ? (
    <div
      id="asdfasdfasdf"
      style={{
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'rgba(0,0,0,1)',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
        }}
      >
        splash Image
      </div>
      <button type="button" onClick={hideModal}>
        x
      </button>
    </div>
  ) : (
    <></>
  );
}

export default Splash;
