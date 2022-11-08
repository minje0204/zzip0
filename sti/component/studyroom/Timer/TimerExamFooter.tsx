// @ts-nocheck
import React, { useState, useEffect } from 'react';
// mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { choosedSubjects } from '../../../lib/recoil/timerState';
import { savedState } from '../../../lib/recoil/timerState';
// component
import { subjectObjectKoKey, subjectMinutes } from '../../subject';
interface Test {}

const TimerExamFooter: Test = () => {
  const choosedSbjs = useRecoilValue(choosedSubjects);
  const [savedTime, setSavedTime] = useRecoilState(savedState);
  return (
    <>
      {choosedSbjs.length !== 0 ? (
        <div>
          <TableContainer>
            <Table sx={{ width: '250px' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ padding: '10px' }}>
                    과목
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '10px' }}>
                    남은 시간
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {choosedSbjs.map((subject) => (
                  <TableRow
                    key={subject.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ fontSize: '10px', padding: '10px' }}
                    >
                      {subject.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: '10px', padding: '10px' }}
                    >
                      <ComputeTime
                        subjectTime={savedTime[subject.name]}
                        sub={subject.name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
