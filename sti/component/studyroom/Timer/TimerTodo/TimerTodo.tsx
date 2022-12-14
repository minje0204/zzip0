// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from '@mui/material';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { todoTimerState } from '../../../../lib/recoil/todoTimerState';
import { UpdateTodoState } from '../../../../lib/recoil/todoTimerState';
import { todoDeleteAPI, todoGetAPI } from '../../../../lib/api/todo';
import { todosState } from '../../../../lib/recoil/todo';
import { studyStart, studyEnd } from '../../../../lib/api/timelog';

//사용자 정의 Hook
const useCounter = (initialValue, ms, logId, itemId, sended) => {
  const [count, setCount] = useState(initialValue);
  const [updateTodo, setUpdateTodo] = useRecoilState(UpdateTodoState);
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
    if (sended === false) {
      pause();
      const data = { type: 'TODO', timelogId: logId, todoitemId: itemId };
      studyEnd(data).then((res) => {});
      setCount(0);
    }
  }, [count, sended]);
  return { count, start, pause, done };
};

export default function TimerTodo() {
  const [selectedTodo, setSelectedTodo] = useState('');
  const [startClicked, setStartClicked] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;
  const [todoList, setTodoList] = useRecoilState(todoTimerState);
  const [updateTodo, setUpdateTodo] = useRecoilState(UpdateTodoState);

  const getTodayTodos = () => {
    todoGetAPI(dateStr.replace(/-/g, '')).then((res) => {
      if (res.data !== '') {
        setTodoList(res.data);
        checkAllDone(res.data);
      } else {
        setTodoList([]);
      }
    });
  };
  useEffect(() => {
    getTodayTodos();
  }, [updateTodo]);

  const [logId, setLogId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const sendStart = () => {
    const findItemId = todoList.find((todo) => todo.content === selectedTodo);
    setItemId(findItemId.todoItemId);
    const data = { type: 'TODO', todoitemId: findItemId.todoItemId };
    studyStart(data).then((res) => {
      setLogId(res.data.timelogId);
      start();
      setStartClicked(true);
    });
  };
  const [sended, setSended] = useState(false);
  //시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, pause, done } = useCounter(
    0,
    1000,
    logId,
    itemId,
    sended
  );

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
    setSelectedTodo(e.target.value);
    setStartClicked(false);
    setSended(false);
  };

  const setToCompleteState = () => {
    //complete되었다고 수정해주기
    let subIdx = todoList.findIndex((todo) => todo.content === selectedTodo);
    const tmp = todoList[subIdx];
    const newValue = {
      todoItemId: tmp.todoItemId,
      complete: true,
      content: tmp.content,
      subject: tmp.subject,
      time: tmp.time,
      todolistResponseDto: tmp.todolistResponseDto
    };
    setTodoList([
      ...todoList.slice(0, subIdx),
      newValue,
      ...todoList.slice(subIdx + 1)
    ]);
    setUpdateTodo(!updateTodo);
  };

  const [needTodo, setNeedTodo] = useState(false);
  const checkAllDone = (checkTodos) => {
    const completeCheck = 0;
    const selectedTodoIdx = checkTodos.findIndex(
      (chcktd) => chcktd.content === selectedTodo
    );
    checkTodos.map((checkTodo) => {
      if (checkTodo.complete == true) {
        completeCheck += 1;
      }
      // if (
      //   (selectedTodoIdx === -1 ||
      //     checkTodos[selectedTodoIdx].complete === true) &&
      //   checkTodo.complete === false
      // ) {
      //   setSelectedTodo(checkTodo.content);
      // }
    });
    if (completeCheck === checkTodos.length || checkTodos.length === 0) {
      setNeedTodo(true);
    } else {
      setNeedTodo(false);
    }
  };
  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);

  return (
    <>
      <SelectContainer>
        {needTodo ? (
          <NeedTodoDiv>Todo에서 목표를 추가로 입력해주세요!</NeedTodoDiv>
        ) : (
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
                  disabled={todo.complete}
                >
                  {todo.content}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </SelectContainer>
      <TimerStudyTime>
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </TimerStudyTime>
      <TimerButtons>
        {startClicked ? (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              done();
              setToCompleteState();
              setSended(true);
            }}
          >
            Done
          </Button>
        ) : (
          <Button variant="outlined" color="inherit" onClick={sendStart}>
            Start
          </Button>
        )}
      </TimerButtons>
    </>
  );
}
const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NeedTodoDiv = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
`;
const TimerButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.67em;
`;
const TimerStudyTime = styled.h1`
  text-align: center;
`;
