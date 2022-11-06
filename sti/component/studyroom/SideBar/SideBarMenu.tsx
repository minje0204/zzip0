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
interface Test {}

const SideBarMenu: Test = () => {
  const [todoOpen, setTodoOpen] = useRecoilState(TodoModalOpen);
  const [timerOpen, setTimerOpen] = useRecoilState(TimerModalOpen);
  const [ddayOpen, setDdayOpen] = useRecoilState(DdayModalOpen);
  const [noiseOpen, setNoiseOpen] = useRecoilState(NoiseModalOpen);

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
        onClick={() => {
          setTodoOpen(true);
        }}
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
        onClick={() => {
          setTimerOpen(true);
        }}
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
        onClick={() => {
          setDdayOpen(true);
        }}
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
        onClick={() => {
          setNoiseOpen(true);
        }}
        size="medium"
      >
        {console.log(noiseOpen)}
        <img src={`/dday.png`} style={{ width: '23px' }} />
        <div id="menu-font">Noise</div>
      </IconButton>
    </SideBarMenuContainer>
  );
};

const SideBarMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  #menu-font {
    font-size: 12px;
  }
`;

export default SideBarMenu;
