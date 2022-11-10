// @ts-nocheck

import React, { useState, useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { roomsState } from '../../lib/recoil/room';
import axios from 'axios';

// css
import home from '../../styles/Home.module.css';

// mui
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

// component

import RoomList from './RoomList';
import ReoomCreate from './RoomCreate';
import { roomGetAPI, canEnterAPI } from '../../lib/api/room';

interface Test {}

const RoomView: Test = () => {
  const setRooms = useSetRecoilState(roomsState);
  const [roomPage, setRoomPage] = useState(0);
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [open, setOpen] = React.useState(true);

  const errorAlert = (message) => {
    return <Alert>{message}</Alert>;
  };
  const getRoom = () => {
    roomGetAPI(roomPage).then((res) => {
      if (res.name == 'AxiosError') {
        alert(res.response.data);
      }
      setRooms((roomsState) => [...res.data.content]);
    });
  };

  const handleCreateBtn = () => {
    canEnterAPI().then((res) => {
      if (res.data) {
        setCreateRoomModalOpen(!createRoomModalOpen);
      } else {
        alert('이미 방에 참여중입니다');
      }
    });
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <>
      <div className={home.homecontainer}>
        <div className={home.createbtncontainer}>
          <Button
            variant="outlined"
            onClick={() => {
              handleCreateBtn();
            }}
            sx={{ color: 'primary.dark' }}
          >
            <b>방만들기</b>
          </Button>
        </div>

        {createRoomModalOpen ? (
          <Modal>
            {' '}
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
            <ReoomCreate />
          </Modal>
        ) : null}

        <RoomList roomPage={roomPage} />
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
