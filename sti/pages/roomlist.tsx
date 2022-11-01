// @ts-nocheck

import React from 'react';
import RoomView from '../component/roomlist/RoomView';
import Navbar from '../component/Navbar';

interface Test {}

const RoomList: Test = () => {
  return (
    <>
      <Navbar />
      <RoomView />
    </>
  );
};

export default RoomList;
