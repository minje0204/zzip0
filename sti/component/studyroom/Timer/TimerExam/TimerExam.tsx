// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
// mui
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { choosedSubjects, savedState } from '../../../../lib/recoil/timerState';
// component
import TimerChooseSubjects from './TimerChooseSubject';
import { subjectMinutes, subjectObjectKoKey } from '../../../subject';
// API
import { studyStart, studyEnd } from '../../../../lib/api/timelog';

//사용자 정의 Hook
const useCounter = (initialValue, ms, sub, id) => {
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
    const data = { type: 'NORMAL', timelogId: id };
    studyEnd(data).then((res) => {
      setCount(0);
    });
  }, [count]);

  return { count, start, pause, done };
};

export default function TimerExam() {
  const [selectedSbj, setSelectedSbj] = useState('');
  const [choosedSbjs, setChoosedSbjs] = useRecoilState(choosedSubjects);
  // const [isDown, setIsDown] = useState(true);

  const setremainTime = useSetRecoilState(savedState);
  useEffect(() => {
    if (choosedSbjs.length !== 0 && selectedSbj === '') {
      setSelectedSbj(choosedSbjs[0].name);
      setInitialTime(subjectMinutes[choosedSbjs[0].name]);
    }
  }, [choosedSbjs]);

  const [timerId, setTimerId] = useState(null);

  const changeSubjectState = (subjectName, changeStateTo) => {
    let subIdx = choosedSbjs.findIndex((csbj) => csbj.name === subjectName);
    const tmp = choosedSbjs[subIdx];
    const newValue = { id: tmp.id, name: tmp.name, state: changeStateTo };
    setChoosedSbjs([
      ...choosedSbjs.slice(0, subIdx),
      newValue,
      ...choosedSbjs.slice(subIdx + 1)
    ]);
  };

  const sendStart = () => {
    const data = { type: 'NORMAL', subject: subjectObjectKoKey[selectedSbj] };
    studyStart(data).then((res) => {
      setTimerId(res.data.timelogId);
      start();
      changeSubjectState(selectedSbj, 1);
      setIsPlayClicked(true);
    });
  };

  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(
    subjectMinutes[selectedSbj] * 60,
    1000,
    selectedSbj,
    timerId
  );
  const changeSubject = (e) => {
    setSelectedSbj(e.target.value);
    setInitialTime(subjectMinutes[e.target.value]);
    setIsPlayClicked(false);
  };
  const refrshChoosedSubject = (e) => {
    if (confirm('정말 삭제하고 다시 시작하시겠습니까?') == true) {
      done();
      setChoosedSbjs([]);
      setremainTime([]);
      setSelectedSbj('');
    }
  };

  const changeToDone = (e) => {
    if (confirm(`${selectedSbj} 시험을 마치시겠습니까?`) == true) {
      done();
      changeSubjectState(selectedSbj, 2);
    }
  };

  const setInitialTime = (initMin) => {
    setCurrentHours(Math.floor(initMin / 60));
    setCurrentMinutes(initMin % 60);
    setCurrentSeconds(0);
  };
  const audioRef = useRef(null);
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    if (seconds >= 0) {
      setCurrentHours(hours);
      setCurrentSeconds(seconds);
      setCurrentMinutes(minutes);
    }
    if (count === 0) {
      done();
      if (audioRef.current !== null) {
        audioRef.current.play();
      }
    }
    // else {
    //   setCurrentHours(hours * -1 - 1);
    //   setCurrentSeconds(seconds * -1);
    //   setCurrentMinutes(minutes * -1 - 1);
    // }
    // if (seconds === -1) {
    //   setIsDown(false);
    // }
  };
  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);

  return (
    <>
      {choosedSbjs.length !== 0 ? (
        <>
          <figure>
            <audio src="/endSound.mp3" ref={audioRef}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
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
                {choosedSbjs.map((sbj, idx) => (
                  <MenuItem
                    value={sbj.name}
                    key={idx}
                    disabled={sbj.state === 2}
                  >
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
            {/* {isDown === false ? <span>- </span> : null} */}
            {currentHours < 10 ? `0${currentHours}` : currentHours}:
            {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
            {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
          </TimerStudyTime>
          <TimerButtons>
            {isPlayClicked ? (
              <button onClick={changeToDone}>Done</button>
            ) : (
              <button onClick={sendStart}>Start</button>
            )}

            {/* // 과목의 state에 따라서 버튼 보여주는 것을 바꿔줘요 */}
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
