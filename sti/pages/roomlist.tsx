// @ts-nocheck

import React, { useState } from 'react';
import Room from '../component/roomlist/Room';
import Button from '@mui/material/Button';

interface Test {}

const RoomList: Test = () => {
  const [roomPage, setRoomPage] = useState(0);
  return (
    <div>
      <Room roomPage={roomPage} />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setRoomPage(roomPage - 1);
        }}
        sx={{ color: 'primary.light' }}
        disabled={roomPage <= 0}
      >
        이전
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setRoomPage(roomPage + 1);
        }}
        sx={{ color: 'primary.light' }}
      >
        다음
      </Button>
    </div>
  );
};

export default RoomList;
