// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

//사용자 정의 Hook
const useCounter = (initialValue, ms) => {
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
    setCount(0);
    pause();
    //시간을 백엔드에 보낸다
  }, []);
  return { count, start, pause, done };
};

export default function TimerStudy() {
  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(0, 1000);

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
  return (
    <>
      <TimerStudyTime>
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </TimerStudyTime>
      <TimerButtons>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={done}>Done</button>
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
