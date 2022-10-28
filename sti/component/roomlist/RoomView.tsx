// @ts-nocheck

import React, { useState, useEffect } from 'react';

import axios from 'axios'
import Room from './Room';
import Button from '@mui/material/Button';
import home from '../../styles/Home.module.css';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import RoomCate from './RoomCate';
import CloseIcon from '@mui/icons-material/Close';
import API from '../../api.js'

interface Test {}

const RoomView: Test = () => {
  const [roomPage, setRoomPage] = useState(0);
  const [roomInfo, setRoomInfo] = useState({});
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const themeNameList = [
    'christmas',
    'city',
    'beach',
    'cafe',
    'games',
    'library',
    'lofi'
  ];

  const getRoom = () => {
    console.log('getroom')
    axios.get(`${API.GETROOM}?page=${roomPage}`)
    .then(res => {
      setRoomInfo(res)
    })
  }

  useEffect(() => {
    getRoom();
  }, [])
  

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
                    autofocus
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
              <CreateBtn>방 생성하기</CreateBtn>
            </div>
          </Modal>
        ) : null}


        <Room roomPage={roomPage} roomInfo={roomInfo} />


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
  height: '450px',
  background: '#FCFCFC',
  padding: '25px',
  borderRadius: '10px'
});
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
  background: '#F0F0F0',
  padding: '10px',
  borderRadius: '10px',
  marginTop: '10px',
  display: 'flex',
  flexFlow: 'wrap',
  justifyContent: 'center'
});
