// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRecoilValue } from 'recoil';
import { subjectTimes } from '../../recoil/timer.js';

//사용자 정의 Hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c - 1);
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

export default function TimerExam() {
  const [nowSubjectIdx, setNowSubjectIdx] = useState(0);
  const subjectMinutes = useRecoilValue(subjectTimes);

  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(
    subjectMinutes[nowSubjectIdx] * 60,
    1000
  );
  const changeSubject = (e) => {
    setNowSubjectIdx(e.target.value);
    setInitialTime(subjectMinutes[e.target.value]);
  };
  const setInitialTime = (initMin) => {
    setCurrentHours(Math.floor(initMin / 60));
    setCurrentMinutes(initMin % 60);
    setCurrentSeconds(0);
  };

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
      <FormControl sx={{ m: 1, width: 100 }} variant="standard">
        <InputLabel id="demo-simple-select-label">과목</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nowSubjectIdx}
          onChange={changeSubject}
          label="과목"
        >
          <MenuItem value="1">국어</MenuItem>
          <MenuItem value="2">수학</MenuItem>
          <MenuItem value="3">영어</MenuItem>
          <MenuItem value="4">한국사</MenuItem>
          <MenuItem value="5">탐구1</MenuItem>
          <MenuItem value="6">탐구2</MenuItem>
          <MenuItem value="7">제2외국어</MenuItem>
        </Select>
      </FormControl>

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

const TimerButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const TimerStudyTime = styled.h1`
  text-align: center;
`;
