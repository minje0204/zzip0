// @ts-nocheck

import React from 'react';
import RoomLayout from './RoomLayout';
import Grid from '@mui/material/Unstable_Grid2';
// import Link from 'next/Link';
import styled from '@emotion/styled';
interface Test {}

const Room: Test = ({ roomPage }) => {
  const roomNums = [
    roomPage * 6,
    roomPage * 6 + 1,
    roomPage * 6 + 2,
    roomPage * 6 + 3,
    roomPage * 6 + 4,
    roomPage * 6 + 5
  ];
  return (
    <RoomListDiv>
      <Grid container>
        {roomNums.map((roomNum) => (
          <Grid xs={6} lg={4}>
            <RoomLayout key={roomNum} roomNum={roomNum} />
          </Grid>
        ))}
      </Grid>
    </RoomListDiv>
  );
};

export default Room;

const RoomListDiv = styled.div({

});
