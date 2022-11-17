// @ts-nocheck
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import styled from 'styled-components';
// css
import RoomStyle from '../../styles/RoomLayout.module.css';
import home from '../../styles/Home.module.css';
import widget from '../../styles/Widget.module.css';
// mui
import Button from '@mui/material/Button';
// recoil
import { myroomState } from '../../lib/recoil/room';
import { canEnterAPI } from '../../lib/api/room';
import { useRecoilState } from 'recoil';
// next
import Link from 'next/link';
// component

interface Test {}

const RoomItems: Test = ({ room }) => {
  const [roominfo, setRoomInfo] = useRecoilState(myroomState);

  const handleClick = () => {
    canEnterAPI()
      .then((res) => {
        if (res.data) {
          router.push(`/studyroom/${room.roomUrl}`);
          setRoomInfo(room);
          console.log(res.data);
        } else {
          alert('이미 방에 참여중입니다.');
        }
      })
      .catch((err) => {
        console.log('err occured!');
      });
  };
  return (
    <RoomItemsContainer
      onClick={() => {
        handleClick();
      }}
    >
      <div className={(home.homecontainer, RoomStyle.roomContainer)}>
        <img
          src={`${room.background.thumbnailUrl}`}
          className={RoomStyle.roomphoto}
        />
      </div>
      <div className={RoomStyle.roomcontent}>
        <div className={RoomStyle.roomtitle}>
          <b>{room.roomTitle}</b>
        </div>
        <div className={RoomStyle.roomtheme}>
          <div className={RoomStyle.roomthemeInfo}>
            {room.background.bgTitle} by {room.background.creator}
          </div>

          {room.background.bgCategory}
        </div>
      </div>
    </RoomItemsContainer>
  );
};

const RoomItemsContainer = styled.div`
width: 100%;
height: 100%;
&:hover{  

  filter: brightness(0.35);
`;

export default RoomItems;
