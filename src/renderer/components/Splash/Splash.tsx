import React, { useContext } from 'react';
import { SplashContext } from './SplashProvider';
import './splash.css';

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
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1202,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Splash;
