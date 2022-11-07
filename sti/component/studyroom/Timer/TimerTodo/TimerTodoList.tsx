// @ts-nocheck

import React, { useState } from 'react';

// mui
import Box from '@mui/material/Box';

// recoil
import { todoTimerState } from '../../../recoil/todoTimerState';
import { useSetRecoilState, useRecoilValue } from 'recoil';

// component
import TimerTodoItems from './TimerTodoItems';

interface Test {}

const TimerTodoList: Test = () => {
  const todoTimers = useRecoilValue(todoTimerState);

  return (
    <>
      {todoTimers.map((todotimer) => (
        <TimerTodoItems key={todotimer.id} data={todotimer} />
      ))}
    </>
  );
};

export default TimerTodoList;
