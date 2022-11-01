// @ts-nocheck

import React, { useEffect, useState } from 'react';

// css
import RoomStyle from '../../styles/RoomLayout.module.css';
import home from '../../styles/Home.module.css';
import widget from '../../styles/Widget.module.css';

// mui
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

// next
import Link from 'next/link';

// component
import RoomList from './RoomList';

interface Test {}

const RoomItems: Test = ({ title, url, cate }) => {

  useEffect(() => {
  }, []);
  return (
    <>
      <Link href={`/studyroom/${url}`}>
        <div className={(home.homecontainer, RoomStyle.roomContainer)}>
          <img src={`/roomsample.jpeg`} className={RoomStyle.roomphoto} />
          <div className={RoomStyle.roomcontent}>
            <div className={RoomStyle.roomtitle}>
              <b>{title}</b>
            </div>
            <div className={RoomStyle.roomtheme}>{cate} theme</div>
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
