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
        {rooms.map((roomss) => (
          <>
            {roomss.map((room) => (
              <RoomItems
                key={room.index}
                title={room.roomTitle}
                url={room.roomUrl}
                cate={room.roomCategory}
              />
            ))}
          </>
        ))}
      </RoomListDiv>
    </>
  );
};

const RoomListDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
export default RoomList;
