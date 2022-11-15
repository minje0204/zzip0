// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { studyStart, studyEnd } from '../../../lib/api/timelog';

//사용자 정의 Hook
const useCounter = (initialValue, ms, id) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);
  const pause = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const done = useCallback(() => {
    if (confirm('끝내시겠습니까?') === true) {
      pause();
      const data = { type: 'NORMAL', timelogId: id };
      studyEnd(data).then((res) => {
        setCount(0);
      });
    }
  }, [count]);
  return { count, start, pause, done };
};

export default function TimerStudy() {
  const [timerId, setTimerId] = useState(null);
  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(0, 1000, timerId);

  // 타이머 기능
  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
  };

  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);

  //start버튼 누르면 api
  const sendStart = () => {
    const data = { type: 'NORMAL', subject: 'ETC' };
    studyStart(data).then((res) => {
      setTimerId(res.data.timelogId);
    });
  };

  return (
    <>
      <TimerStudyTime>
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </TimerStudyTime>
      <TimerButtons>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            start();
            sendStart();
          }}
        >
          Start
        </Button>
        <Button variant="outlined" color="inherit" onClick={done}>
          Done
        </Button>
      </TimerButtons>
    </>
  );
}
const TimerStudyTime = styled.h1`
  text-align: center;
`;
const TimerButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
