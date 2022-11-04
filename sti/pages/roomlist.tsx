// @ts-nocheck

import React, { useEffect } from 'react';
import RoomView from '../component/roomlist/RoomView';
import Navbar from '../component/Navbar';
import { getUser } from '../lib/api/member';
import { userState } from '../lib/recoil/member';
import { useRecoilState } from 'recoil';

interface Test {}

const RoomList: Test = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    getUser().then((res) => {
      setUserInfo(res.data);
      console.log('setuser', userInfo);
    });
  };
  return (
    <>
      <Navbar />
      <RoomView />
    </>
  );
};

export default RoomList;
