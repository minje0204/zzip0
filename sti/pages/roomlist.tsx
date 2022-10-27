// @ts-nocheck

import React, { useState } from 'react';
import Room from '../component/roomlist/Room';
import Button from '@mui/material/Button';
import home from '../styles/Home.module.css';
import Navbar from '../component/Navbar';

interface Test {}

const RoomList: Test = () => {
  const [roomPage, setRoomPage] = useState(0);
  return (
    <>
      <Navbar />

      <div className={home.homecontainer}>
        <div className={home.createbtncontainer}>
        <div>
          <Button>방만들기</Button>
          </div>
        </div>
        <Room roomPage={roomPage} />
      </div>
      <div className={home.roombtncontainer}>
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
    </>
  );
};

export default RoomList;
