// @ts-nocheck

import React, { useEffect, useState } from 'react';
import RoomStyle from '../../styles/RoomLayout.module.css';
import home from '../../styles/Home.module.css';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styled from '@emotion/styled';
import RoomList from './RoomList';

interface Test {}

const RoomItems: Test = ({ title, url, cate }) => {
  const [roomUrl, setRoomUrl] = useState('');

  useEffect(() => {
    setRoomUrl(JSON.parse(localStorage.getItem('roomUrl')));
  }, []);
  return (
    <>
      <Link href={`/studyroom/${url}`}>
        <div className={home.homecontainer}>
          <div className={RoomStyle.roomRow}>
            <h3 className={RoomStyle.roomTypo}>title</h3>
            <div className={RoomStyle.roomContent}>{title}</div>
          </div>
          <div className={RoomStyle.roomRow}>
            <h3 className={RoomStyle.roomTypo}>theme</h3>
            <div className={RoomStyle.roomContent}>{cate}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

function enterRoom() {
  console.log('눌렸음');
}

export default RoomItems;
