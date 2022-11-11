// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { todoTimerState } from '../../../../lib/recoil/todoTimerState';
import { todoDeleteAPI, todoGetAPI } from '../../../../lib/api/todo';
import { todosState } from '../../../../lib/recoil/todo';
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
    pause();
    if (confirm('목표를 끝내시겠습니까?') === true) {
      console.log(todosState);
      console.log(count, '끗');
      //
      setCount(0);
    }
  }, [count]);
  return { count, start, pause, done };
};

export default function TimerTodo() {
  const [selectedTodo, setSelectedTodo] = useState('');

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;
  const [todoList, setTodoList] = useRecoilState(todoTimerState);

  const getTodayTodos = () => {
    todoGetAPI(dateStr.replace(/-/g, '')).then((res) => {
      console.log(res);
      if (res.data !== '') {
        setTodoList(res.data);
        setSelectedTodo(res.data[0].content);
      } else {
        setTodoList([]);
      }
    });
  };

  useEffect(() => {
    getTodayTodos();
    console.log(todoList, 'tdl');
  }, []);

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

  const changeTodo = (e) => {
    // setSelectedTodo(
    //   todoList.findIndex((todo) => todo.content === e.target.value)
    // );
    setSelectedTodo(e.target.value);
  };
  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);
  return (
    <>
      <SelectContainer>
        <FormControl sx={{ m: 1, width: '202px' }} variant="standard">
          <InputLabel id="demo-simple-select-label">목표</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={selectedTodo}
            value={selectedTodo}
            onChange={changeTodo}
            label="목표"
          >
            {todoList.map((todo, idx) => (
              <MenuItem
                value={todo.content}
                key={idx}
                // disabled={isDone[idx]}
              >
                {todo.content}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <Tooltip arrow title="과목 다시 선택하기">
          <RefreshIcon onClick={refrshChoosedSubject} />
        </Tooltip> */}
      </SelectContainer>
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
