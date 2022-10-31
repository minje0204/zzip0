// @ts-nocheck

import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import RoomCate from './RoomCate';
interface Test {}

const RoomCreate: Test = () => {
  const themeNameList = [
    'christmas',
    'city',
    'beach',
    'cafe',
    'games',
    'library',
    'pets',
    'lofi'
  ];
  const [roomTitle, setRoomTitle] = useState('');

  return (
    <>
      <ModalTitle>
        <ModalLeftTitle>Create Study Room</ModalLeftTitle>
        <CloseBtn
          onClick={() => {
            setCreateRoomModalOpen(!createRoomModalOpen);
          }}
        >
          <CloseIcon />
        </CloseBtn>
      </ModalTitle>

      <ModalContents>
        <ModalContent>
          <ModalQ>방제목</ModalQ>
          <span>
            <TextField
              variant="standard"
              onChange={(e) => {
                setRoomTitle(e.target.value);
              }}
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
              {themeNameList.map((themeName) => (
                <RoomCate key={themeName} themeName={themeName} />
              ))}
            </Themes>
          </ModalContent>
        </div>
      </ModalContents>

      <div style={{ textAlign: 'center' }}>
        <CreateBtn onCLick=()>방 생성하기</CreateBtn>
      </div>
    </>
  );
};

export default RoomCreate;

const ModalTitle = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
});
const ModalLeftTitle = styled.h2({
  display: 'inline'
});
const CloseBtn = styled.button({
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  cursor: 'pointer'
});
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
