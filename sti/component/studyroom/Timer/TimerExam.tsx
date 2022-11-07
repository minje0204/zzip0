// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  choosedSubjects,
  subjectTimes,
  selectedSubject
} from '../../../lib/recoil/timerState';
import TimerChooseSubjects from './TimerChooseSubject';

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
    pause();
    //시간을 백엔드에 보낸다
  }, []);
  return { count, start, pause, done };
};

export default function TimerExam() {
  const subjectMinutes = useRecoilValue(subjectTimes);
  const [selectedSbj, setSelectedSbj] = useRecoilState(selectedSubject);
  const [choosedSbjs, setChoosedSbjs] = useRecoilState(choosedSubjects);
  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(
    subjectMinutes[selectedSbj] * 60,
    1000
  );
  const changeSubject = (e) => {
    setSelectedSbj(e.target.value);
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
  const sbjs = ['국어', '수학', '영어', '한국사', '탐구 1', '탐구 2', '외국어'];

  return (
    <>
      {choosedSbjs.length !== 0 ? (
        <>
          <FormControl sx={{ m: 1, width: 100 }} variant="standard">
            <InputLabel id="demo-simple-select-label">과목</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSbj}
              onChange={changeSubject}
              label="과목"
            >
              <MenuItem value="korean">국어</MenuItem>
              <MenuItem value="math">수학</MenuItem>
              <MenuItem value="english">영어</MenuItem>
              <MenuItem value="koreanhistory">한국사</MenuItem>
              <MenuItem value="sub1">탐구1</MenuItem>
              <MenuItem value="sub2">탐구2</MenuItem>
              <MenuItem value="language">제2외국어</MenuItem>
            </Select>
          </FormControl>
          <TimerStudyTime>
            {0 <= currentHours && currentHours < 10
              ? `0${currentHours}`
              : currentHours}
            :
            {0 <= currentMinutes && currentMinutes < 10
              ? `0${currentMinutes}`
              : currentMinutes}
            :
            {0 <= currentSeconds && currentSeconds < 10
              ? `0${currentSeconds}`
              : currentSeconds}
          </TimerStudyTime>
          <TimerButtons>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={done}>Done</button>
          </TimerButtons>
        </>
      ) : (
        <TimerChooseSubjects />
      )}
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
