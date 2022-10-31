// @ts-nocheck

import React, { useEffect } from 'react';
import RoomItems from './RoomItems';
import Grid from '@mui/material/Unstable_Grid2';
// import Link from 'next/Link';
import styled from '@emotion/styled';

// recoil
import { roomsState } from '../../recoil/roomsState';
import { useRecoilValue } from 'recoil';

interface Test {}

const RoomList: Test = ({}) => {
  const rooms = useRecoilValue(roomsState);

  useEffect(() => {}, []);

  return (
    <>
      <RoomListDiv>
        {console.log(rooms)}
          <RoomListContainer>
            {rooms.map((room) => (
              <RoomItems
                key={room.roomUrl}
                title={room.roomTitle}
                url={room.roomUrl}
                cate={room.roomCategory}
              />
            ))}
          </RoomListContainer>
      </RoomListDiv>
    </>
  );
};

const RoomListDiv = styled.div``;

const RoomListContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-template-rows: 200px 200px;
  row-gap: 20px;
  column-gap: 20px;
`;
export default RoomList;
