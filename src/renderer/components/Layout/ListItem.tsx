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
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
      <ListItemText primary="대시보드" />
    </ListItemButton>
  );
};

// export const OnedayQuestLnbItem = () => {
//   const navigate = useNavigate();

//   const handleClickButton = () => {
//     navigate('/oneday-quest');
//   };
//   return (
//     <ListItemButton onClick={handleClickButton}>
//       <ListItemIcon>
//         <CalendarTodayIcon />
//       </ListItemIcon>
//       <ListItemText primary="일일 퀘스트" />
//     </ListItemButton>
//   );
// };

export const mainListItems = (
  <React.Fragment>
    <DashboardLnbItem />
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="주간 계정 퀘스트" />
    </ListItemButton>
  </React.Fragment>
);

// const secondaryRadeGuid = () => {
//   const navigate = useNavigate();

//   const handleClickButton = () => {
//     navigate('/oneday-quest');
//   };
//   return (
//     <ListItemButton onClick={handleClickButton}>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="쿠쿠빙고" />
//     </ListItemButton>
//   );
// }

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
      {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
      <ListItemButton onClick={handleGetUserInfo}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="아이템 추가" />
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
      {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
    </React.Fragment>
  );
};
