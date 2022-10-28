// @ts-nocheck

import React, { useState } from 'react';
import Room from './Room';
import Button from '@mui/material/Button';
import home from '../../styles/Home.module.css';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

interface Test {}

const RoomView: Test = () => {
  const [roomPage, setRoomPage] = useState(0);
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
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
  return (
    <>
      <div className={home.homecontainer}>
        <div className={home.createbtncontainer}>
          <Button
            variant="outlined"
            onClick={() => {
              setCreateRoomModalOpen(!createRoomModalOpen);
            }}
            sx={{ color: 'primary.dark' }}
          >
            <b>방만들기</b>
          </Button>
        </div>
        {createRoomModalOpen ? (
          <Modal>
            <div style={{ textAlign: 'right' }}>
              <CloseBtn
                onClick={() => {
                  setCreateRoomModalOpen(!createRoomModalOpen);
                }}
              >
                <img src="minus.png" width="18px"></img>
              </CloseBtn>
            </div>
            <ModalContents>
              <ModalContent>
                <ModalTitle>방제목</ModalTitle>
                <span>
                  <TextField
                    variant="standard"
                    onChange={(e) => {
                      setRoomTitle(e.target.value);
                    }}
                  />
                </span>
              </ModalContent>
              <div>
                <ModalContent>
                  <ModalTitle>테마선택</ModalTitle>
                  <Themes>
                    {themeNameList.map((themeName) => (
                      <ThemeSelectBtn key={themeName}>
                        {themeName}
                      </ThemeSelectBtn>
                    ))}
                  </Themes>
                </ModalContent>
              </div>
            </ModalContents>
            <div style={{ textAlign: 'center' }}>
              <CreateBtn>방 생성하기</CreateBtn>
            </div>
          </Modal>
        ) : null}
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

export default RoomView;

const Modal = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '100',
  width: '500px',
  height: '350px',
  background: '#FCFCFC',
  border: '2px solid #000',
  padding: '25px',
  borderRadius: '10px'
});
const CloseBtn = styled.button({
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  cursor: 'pointer'
});
const ModalContents = styled.div({});
const ModalContent = styled.div({
  margin: '10px'
});
const CreateBtn = styled.button({
  backgroundColor: '#E39685',
  cursor: 'pointer',
  borderStyle: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px'
});
const ThemeSelectBtn = styled.button({
  cursor: 'pointer',
  border: '1px solid black',
  borderRadius: '20px',
  padding: '10px 20px',
  margin: '5px',
  fontSize: '16px'
});
const ModalTitle = styled.h3({
  display: 'inline',
  marginRight: '10px'
});
const Themes = styled.div({
  background: '#F0F0F0',
  display: 'flex',
  flexFlow: 'wrap',
  justifyContent: 'space-around',
  padding: '10px',
  borderRadius: '10px',
  marginTop: '10px'
});
