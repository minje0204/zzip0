// @ts-nocheck
import React, { useState, useEffect } from 'react';
import router from 'next/router';
// mui
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
// lib
import { toast } from 'react-toastify';
import { roomPostAPI } from '../../lib/api/room';
import { RoomCreateModalOpen } from '../../lib/recoil/Modal';
import { myroomState } from '../../lib/recoil/room';
// component
import RoomCate from './RoomCate';
import { useRecoilState } from 'recoil';

interface Test {}

const RoomCreate: Test = () => {
  const [createOpen, setCreateOpen] = useRecoilState(RoomCreateModalOpen);
  const [roomTitle, setRoomTitle] = useState('같이 공부해요!');
  const [roomCategory, setRoomCategory] = useState('');
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [myroom, setMyRoom] = useRecoilState(myroomState);
  const cates = [
    'christmas',
    'city',
    'beach',
    'cafe',
    'games',
    'library',
    'pets',
    'lofi'
  ];

  const cateList = cates.map((cate) => (
    <Tooltip
      key={cate}
      title={<Typography fontSize={30}>{cate}</Typography>}
      followCursor
    >
      <IconButton
        variant="outlined"
        sx={{
          border: 1,
          borderColor: '#e9e9e9',
          padding: 1.7,
          borderRadius: 4,
          margin: 0.5
        }}
        onClick={(e) => selectCate(cate)}
        size="medium"
      >
        <img src={`/${cate}.png`} style={{ width: '40px' }} />
      </IconButton>
    </Tooltip>
  ));

  const postRoom = () => {
    roomPostAPI({
      roomTitle: roomTitle,
      backgroundCategory: roomCategory
    }).then((res) => {
      setCreateOpen(false);
      router.push(`/studyroom/${res.data.roomUrl}`);
      setMyRoom(res.data);
    });
  };

  const selectCate = (data) => {
    setRoomCategory(data.toUpperCase());
  };

  return (
    <>
      <ModalContents>
        <ModalContent>
          <ModalQ>방제목</ModalQ>
          <span>
            <TextField
              variant="standard"
              onChange={(e) => {
                setRoomTitle(e.target.value);
              }}
              value={roomTitle}
              autoFocus
              inputProps={{
                maxLength: 20,
                style: { fontSize: 16, fontFamily: 'CircularStd' }
              }}
              sx={{ width: 300 }}
            />
          </span>
        </ModalContent>
        <div>
          <ModalContent>
            <ModalQ>테마선택</ModalQ>
            <Themes>
              <CateContainer>{cateList}</CateContainer>
            </Themes>
          </ModalContent>
        </div>
      </ModalContents>

      {/* 여기에 룸 crate 해서 response 받은거 url넣어서 next link 설정해주기, + modal 닫기 ! */}
      {/* modal close 변수와  내 룸 정보를 받아놓는 스테이트를 리코일로 전역관리 필요함 */}
      <CreateBtnContainer style={{ textAlign: 'center' }}>
        <CreateBtn onClick={postRoom} color="inherit">
          방 생성하기
        </CreateBtn>
      </CreateBtnContainer>
    </>
  );
};

export default RoomCreate;

const ModalContents = styled.div({});
const ModalContent = styled.div({
  margin: '20px'
});
const CreateBtn = styled.button({
  backgroundColor: '#4169E1',
  color: 'white',
  cursor: 'pointer',
  borderStyle: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  textAlign: 'center'
});
const ModalQ = styled.h3({
  display: 'inline',
  marginRight: '50px'
});
const Themes = styled.div({
  borderColor: '#F0F0F0',
  padding: '10px',
  borderRadius: '10px',
  marginTop: '10px',
  display: 'flex',
  flexFlow: 'wrap',
  justifyContent: 'center'
});
const CateContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: ' center',
  margin: '0 10px'
});
const CreateBtnContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: ' center',
  margin: '20px'
});
