// @ts-nocheck

import React from 'react';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { TodoModalOpen } from '../../../lib/recoil/Modal';
import { TimerModalOpen } from '../../../lib/recoil/Modal';

interface Test {}

const SideBarMenu: Test = () => {
  const [todoOpen, setTodoOpen] = useRecoilState(TodoModalOpen);
  const [timerOpen, setTimerOpen] = useRecoilState(TimerModalOpen);
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
          padding: 1.7,
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => {
          setTodoOpen(true);
        }}
        size="medium"
      >
        <img src={`/todo.png`} style={{ width: '23px' }} />
        <Typography variant="caption" display="block">
          TODO
        </Typography>
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
          padding: 1.7,
          borderRadius: 2,
          margin: 0.3
        }}
        onClick={() => {
          setTimerOpen(true);
        }}
        size="medium"
      >
        <img src={`/stopwatch.png`} style={{ width: '23px' }} />
        <Typography variant="caption" display="block">
          TIMER
        </Typography>
      </IconButton>
    </SideBarMenuContainer>
  );
};

const SideBarMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export default SideBarMenu;
