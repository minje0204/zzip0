// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { choosedSubjects, savedState } from '../../../lib/recoil/timerState';
import TimerChooseSubjects from './TimerChooseSubject';
import { subjectMinutes } from '../../subject';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';

//사용자 정의 Hook
const useCounter = (initialValue, ms, sub) => {
  const [count, setCount] = useState(initialValue);
  const [remainTime, setremainTime] = useRecoilState(savedState);
  useEffect(() => {
    setCount(initialValue);
  }, [sub]);
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
    setremainTime({ ...remainTime, [sub]: count });
  }, [count]);

  return { count, start, pause, done };
};

export default function TimerExam() {
  const [selectedSbj, setSelectedSbj] = useState('');
  const [choosedSbjs, setChoosedSbjs] = useRecoilState(choosedSubjects);
  const [isDown, setIsDown] = useState(true);
  const setremainTime = useSetRecoilState(savedState);
  useEffect(() => {
    if (choosedSbjs.length !== 0) {
      setSelectedSbj(choosedSbjs[0].name);
    }
  }, [choosedSbjs]);

  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(
    subjectMinutes[selectedSbj] * 60,
    1000,
    selectedSbj
  );
  const changeSubject = (e) => {
    setSelectedSbj(e.target.value);
    setInitialTime(subjectMinutes[e.target.value]);
  };
  const refrshChoosedSubject = (e) => {
    if (confirm('정말 삭제하고 다시 시작하시겠습니까?') == true) {
      setChoosedSbjs([]);
      setremainTime([]);
    }
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
    if (seconds >= 0) {
      setCurrentHours(hours);
      setCurrentSeconds(seconds);
      setCurrentMinutes(minutes);
    } else {
      setCurrentHours(hours * -1 - 1);
      setCurrentSeconds(seconds * -1);
      setCurrentMinutes(minutes * -1 - 1);
    }
    if (seconds === -1) {
      setIsDown(false);
    }
  };
  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);

  return (
    <>
      {choosedSbjs.length !== 0 ? (
        <>
          <SelectContainer>
            <FormControl sx={{ m: 1, width: 100 }} variant="standard">
              <InputLabel id="demo-simple-select-label">과목</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={selectedSbj}
                value={selectedSbj}
                onChange={changeSubject}
                label="과목"
              >
                {choosedSbjs.map((sbj) => (
                  <MenuItem value={sbj.name} key={sbj.name}>
                    {sbj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip arrow title="과목 다시 선택하기">
              <RefreshIcon onClick={refrshChoosedSubject} />
            </Tooltip>
          </SelectContainer>
          <TimerStudyTime>
            {isDown === false ? <span>- </span> : null}
            {currentHours < 10 ? `0${currentHours}` : currentHours}:
            {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
            {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
          </TimerStudyTime>
          <TimerButtons>
            <button onClick={start}>Start</button>
            {/* <button onClick={pause}>Pause</button> */}
            <button onClick={done}>Done</button>
          </TimerButtons>
        </>
      ) : (
        <TimerChooseSubjects />
      )}
    </>
  );
}

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TimerButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const TimerStudyTime = styled.h1`
  text-align: center;
`;
