/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import React from 'react';
import { Switch } from '@mui/material';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/auth';

function CharSetting() {
  const [charInfo, setCharInfo] = useRecoilState(authState);

  const handleDisplayClick = (name: string) => {
    setCharInfo((ps) =>
      produce(ps, (ds) => {
        const fidx = ds.findIndex((item) => item.name === name);
        if (fidx !== -1) {
          ds[fidx].display = !ds[fidx].display;
        }
      }),
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {charInfo.map((char) => {
        return (
          <div key={char.name}>
            <img src={char.profileSrc} alt={char.name} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {char.name}
              <div>
                숨김
                <Switch
                  defaultChecked={!char.display}
                  onClick={() => handleDisplayClick(char.name)}
                />
              </div>
              {char.itemLevel}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharSetting;
