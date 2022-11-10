// @ts-nocheck
import React, { useEffect, useState } from 'react';
import router from 'next/router';
// css
import RoomStyle from '../../styles/RoomLayout.module.css';
import home from '../../styles/Home.module.css';
import widget from '../../styles/Widget.module.css';
// mui
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
// recoil
import { myroomState } from '../../lib/recoil/room';
import { canEnterAPI } from '../../lib/api/room';
import { useRecoilState } from 'recoil';
// next
import Link from 'next/link';
// component

interface Test {}

const RoomItems: Test = ({ id, title, url, cate }) => {
  const [roominfo, setRoomInfo] = useRecoilState(myroomState);
  const handleClick = () => {
    canEnterAPI(id).then((res) => {
      if (res.data) {
        router.push(`/studyroom/${url}`);
        setRoomInfo({ id, title, url, cate });
      } else {
        alert('이미 방에 참여중입니다.');
      }
    });
  };
  useEffect(() => {
    console.log('chagnedmyroom', roominfo);
  }, [roominfo]);
  return (
    <>
      <a onClick={(e) => handleClick(e, `/studyroom/${url}`)}>
        <div
          onClick={() => {
            handleClick;
          }}
          className={(home.homecontainer, RoomStyle.roomContainer)}
        >
          <img src={`/roomsample.jpeg`} className={RoomStyle.roomphoto} />
          <div className={RoomStyle.roomcontent}>
            <div className={RoomStyle.roomtitle}>
              <b>{title}</b>
            </div>
            <div className={RoomStyle.roomtheme}>{cate} theme</div>
          </div>
        </div>
      </a>
    </>
  );
};

function enterRoom() {
  console.log('눌렸음');
}

export default RoomItems;
