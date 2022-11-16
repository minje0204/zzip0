// @ts-nocheck
import React, { useState, useEffect } from 'react';
import timerStyle from '../../../../styles/Timer.module.css';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { choosedSubjects, savedState } from '../../../../lib/recoil/timerState';
// component
import { subjectMinutes } from '../../../subject';

interface Test {}

const TimerExamFooter: Test = () => {
  const choosedSbjs = useRecoilValue(choosedSubjects);
  const [savedTime, setSavedTime] = useRecoilState(savedState);
  return (
    <>
      {choosedSbjs.length !== 0 ? (
        <div className={timerStyle.timerFooter}>
          <table>
            <thead>
              <tr>
                <th>과목</th>
                <th>남은 시간</th>
              </tr>
            </thead>
            <tbody>
              {choosedSbjs.map((subject) => (
                <tr key={subject.name}>
                  <td>{subject.name}</td>
                  <td>
                    <ComputeTime
                      subjectTime={savedTime[subject.name]}
                      sub={subject.name}
                    />
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

export default TimerExamFooter;

const ComputeTime: Test = ({ subjectTime, sub }) => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [isCountDown, setIsCountDown] = useState(true);
  useEffect(() => {
    if (subjectTime >= 0) {
      setIsCountDown(true);
      setHour(Math.floor(subjectTime / 3600));
      setMin(Math.floor(subjectTime / 60) % 60);
      setSec(subjectTime % 60);
    } else {
      setIsCountDown(false);
      setHour(Math.floor(subjectTime / 3600) * -1 - 1);
      setMin((Math.floor(subjectTime / 60) % 60) * -1 - 1);
      setSec((subjectTime % 60) * -1);
    }
  }, [subjectTime]);

  const originHr = Math.floor(subjectMinutes[sub] / 60);
  const originMin = subjectMinutes[sub] % 60;
  return (
    <>
      {subjectTime === undefined ? (
        <>
          {originHr}:{originMin}:00
        </>
      ) : (
        <>
          {isCountDown === false ? <span>- </span> : null}
          {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
          {sec < 10 ? `0${sec}` : sec}
        </>
      )}
    </>
  );
};
