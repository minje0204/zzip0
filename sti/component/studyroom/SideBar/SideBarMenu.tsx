// @ts-nocheck

import React from 'react';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { TodoModalOpen } from '../../../lib/recoil/Modal';
import { NoiseModalOpen } from '../../../lib/recoil/Modal';
import { TimerModalOpen } from '../../../lib/recoil/Modal';
import { DdayModalOpen } from '../../../lib/recoil/Modal';
import { MemoModalOpen } from '../../../lib/recoil/Modal';
import { ChatModalOpen } from '../../../lib/recoil/Modal';
import { todoPatchAPI } from '../../../lib/api/todo';
interface Test {}

const SideBarMenu: Test = () => {
  const [todoOpen, setTodoOpen] = useRecoilState(TodoModalOpen);
  const [timerOpen, setTimerOpen] = useRecoilState(TimerModalOpen);
  const [ddayOpen, setDdayOpen] = useRecoilState(DdayModalOpen);
  const [noiseOpen, setNoiseOpen] = useRecoilState(NoiseModalOpen);
  const [memoOpen, setMemoOpen] = useRecoilState(MemoModalOpen);
  const [chatOpen, setChatOpen] = useRecoilState(ChatModalOpen);

  const handleTodoModal = () => {
    if (todoOpen) setTodoOpen(false);
    else setTodoOpen(true);
  };
  const handleTimerModal = () => {
    if (timerOpen) setTimerOpen(false);
    else setTimerOpen(true);
  };
  const handleDdayModal = () => {
    if (ddayOpen) setDdayOpen(false);
    else setDdayOpen(true);
  };
  const handleNoiseModal = () => {
    if (noiseOpen) setNoiseOpen(false);
    else setNoiseOpen(true);
  };
  const handleMemoModal = () => {
    if (memoOpen) setMemoOpen(false);
    else setMemoOpen(true);
  };
  const handleChatModal = () => {
    if (chatOpen) setChatOpen(false);
    else setChatOpen(true);
  };

  return (
    <SideBarMenuContainer>
      <IconButton
        variant="outlined"
        style={{ display: 'block', textAlign: 'center' }}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => handleTodoModal()}
        size="medium"
      >
        <img src={`/todo.png`} style={{ width: '23px' }} />
        <div id="menu-font">TODO</div>
      </IconButton>
      <IconButton
        variant="outlined"
        style={{ display: 'block', textAlign: 'center' }}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => handleTimerModal()}
        size="medium"
      >
        <img src={`/stopwatch.png`} style={{ width: '23px' }} />
        <div id="menu-font">TIMER</div>
      </IconButton>
      <IconButton
        variant="outlined"
        style={{ display: 'block', textAlign: 'center' }}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => handleDdayModal()}
        size="medium"
      >
        <img src={`/dday.png`} style={{ width: '23px' }} />
        <div id="menu-font">D-day</div>
      </IconButton>
      <IconButton
        variant="outlined"
        style={{ display: 'block', textAlign: 'center' }}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => handleNoiseModal()}
        size="medium"
      >
        <img src={`/audio-waves.png`} style={{ width: '23px' }} />
        <div id="menu-font">Noise</div>
      </IconButton>
      <IconButton
        variant="outlined"
        style={{ display: 'block', textAlign: 'center' }}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => handleMemoModal()}
        size="medium"
      >
        <img src={`/edit.png`} style={{ width: '23px' }} />
        <div id="menu-font">Notes</div>
      </IconButton>
      <IconButton
        variant="outlined"
        style={{ display: 'block', textAlign: 'center' }}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => handleChatModal()}
        size="medium"
      >
        <img src={`/chat.png`} style={{ width: '23px' }} />
        <div id="menu-font">Chat</div>
      </IconButton>
    </SideBarMenuContainer>
  );
};

const SideBarMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
  #menu-font {
    font-size: 12px;
  }
`;

export default SideBarMenu;
