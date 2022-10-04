/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-fragments */
import * as React from 'react';

import { useRecoilValue } from 'recoil';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AddItemModalContext } from '../AddItemModal/AddItemModalProvider';
import { userAtomState } from '../../recoil/user.state';
import useGetOrganization from '../../api/get-organization.api';

export const DashboardLnbItem = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate('/dashboard');
  };
  return (
    <ListItemButton onClick={handleClickButton}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="메인" />
    </ListItemButton>
  );
};

export const CharacterSettingItem = () => {
  const navi = useNavigate();
  const handleClick = () => {
    navi('/character/setting');
  };
  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="캐릭터 설정" />
    </ListItemButton>
  );
};

export const SecondaryListItems = () => {
  const addItemModalState = React.useContext(AddItemModalContext);
  const userInfo = useRecoilValue(userAtomState);
  const navi = useNavigate();
  const { data: orgList } = useGetOrganization(userInfo?.name ?? '');
  if (addItemModalState === null) return <></>;
  const { showModal } = addItemModalState;

  const handleGetUserInfo = () => {
    if (userInfo === null) {
      toast.error('로그인이후 사용 가능합니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      showModal();
    }
  };

  const handleClickGuser = (name: string) => {
    navi(`/character/${name}`);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleGetUserInfo}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="토큰 추가" />
      </ListItemButton>
      {orgList?.map((item) => {
        return (
          <ListItemButton
            key={item.name}
            onClick={() => handleClickGuser(item.name)}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );
};

const PrivateIcon = () => {
  const navi = useNavigate();

  return (
    <ListItemButton onClick={() => navi('/private')}>
      <ListItemIcon>
        <SecurityIcon />
      </ListItemIcon>
      <ListItemText primary="private" />
    </ListItemButton>
  );
};

const RaidInfo = () => {
  const navi = useNavigate();

  return (
    <ListItemButton onClick={() => navi('/raidinfo')}>
      <ListItemIcon>
        <AutoStoriesIcon />
      </ListItemIcon>
      <ListItemText primary="레이드 보상 정보" />
    </ListItemButton>
  );
};

export const mainListItems = (
  <React.Fragment>
    <DashboardLnbItem />
    <CharacterSettingItem />
    <RaidInfo />
    <PrivateIcon />
  </React.Fragment>
);
