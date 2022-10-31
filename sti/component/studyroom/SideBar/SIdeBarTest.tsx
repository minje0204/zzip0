// @ts-nocheck

import React, { useState, useEffect } from 'react';
// import { useRouter } from "next/router";

interface Test {}

const SideBarTest: Test = () => {
  // const { roomNum } = useRouter();
  const [roomUrl, setRoomUrl] = useState('');
  useEffect(() => {
    setRoomUrl(localStorage.getItem('roomUrl'));
  }, []);
  return <div>{roomUrl}</div>;
};

export default SideBarTest;
