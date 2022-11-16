// @ts-nocheck
import React, { useState, useEffect } from 'react';
import timerStyle from '../../../../styles/Timer.module.css';
// recoil
import { useRecoilState } from 'recoil';
import { todoTimerState } from '../../../../lib/recoil/todoTimerState';
import { subjectObjectEnKey } from '../../../subject';
// component
interface Test {}

const TimerTodoFooter: Test = () => {
  const [todoList, setTodoList] = useRecoilState(todoTimerState);

  return (
    <>
      {todoList.length !== 0 ? (
        <div className={timerStyle.timerFooter}>
          <table>
            <thead>
              <tr>
                <th>과목</th>
                <th>목표</th>
                <th>걸린 시간</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((todo, idx) => (
                <tr key={idx}>
                  <td style={{ width: '25%' }}>
                    {subjectObjectEnKey[todo.subject]}
                  </td>
                  <td style={{ width: '62%' }}>{todo.content}</td>
                  <td style={{ width: 'auto' }}>
                    <ComputeTime todoSec={todo.time} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default TimerTodoFooter;

const ComputeTime: Test = ({ todoSec }) => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  useEffect(() => {
    setHour(Math.floor(todoSec / 3600));
    setMin(Math.floor(todoSec / 60) % 60);
    setSec(todoSec % 60);
  }, [todoSec]);

  return (
    <>
      {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
      {sec < 10 ? `0${sec}` : sec}
    </>
  );
};
