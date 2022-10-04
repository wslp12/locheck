import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RaidInfo() {
  return (
    <>
      <Grid container spacing={0.1}>
        <Grid xs={1}>
          <Item>군단장</Item>
        </Grid>
        <Grid xs={1}>
          <Item>난이도</Item>
        </Grid>
        <Grid xs={1}>
          <Item>관문</Item>
        </Grid>
        <Grid xs={3}>
          <Item>기본 보상 획득 골드량</Item>
        </Grid>
        <Grid xs={3}>
          <Item>더보기 보상골드 소모량</Item>
        </Grid>
        <Grid xs={3}>
          <Item>총 보상</Item>
        </Grid>
      </Grid>
      <table>
        <tr>
          <th>군단장</th>
          <th>난이도</th>
          <th>관문</th>
          <th>기본 보상획득 골드량</th>
          <th>더보기 보상골드 소모량</th>
          <th>총보상</th>
        </tr>
        <tr>
          <td>발탄</td>
          <td>노말</td>
          <td>1관문</td>
          <td>
            마수의 힘줄 3개
            <br />
            마수의 뼈 1개
            <br />
            500골드
          </td>
          <td>마수의힘줄 3개 마수의뼈 1개 -500골드</td>
        </tr>
        <tr>
          <td>비아키스</td>
          <td>노말</td>
          <td>1관문</td>
          <td>
            마수의 힘줄 3개
            <br />
            마수의 뼈 1개
            <br />
            500골드
          </td>
          <td>마수의힘줄 3개 마수의뼈 1개 -500골드</td>
        </tr>
        <tr>
          <td>쿠쿠세이튼</td>
          <td>노말</td>
          <td>1관문</td>
          <td>
            마수의 힘줄 3개
            <br />
            마수의 뼈 1개
            <br />
            500골드
          </td>
          <td>마수의힘줄 3개 마수의뼈 1개 -500골드</td>
        </tr>
        <tr>
          <td>아브렐슈드</td>
          <td>노말</td>
          <td>1관문</td>
          <td>
            마수의 힘줄 3개
            <br />
            마수의 뼈 1개
            <br />
            500골드
          </td>
          <td>마수의힘줄 3개 마수의뼈 1개 -500골드</td>
        </tr>
      </table>
    </>
  );
}

export default RaidInfo;
