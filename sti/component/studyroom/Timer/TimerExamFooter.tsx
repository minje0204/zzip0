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
  const hour = Math.floor(subjectTime / 3600);
  const min = Math.floor(subjectTime / 60) % 60;
  const sec = subjectTime % 60;
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
          {0 <= hour && hour < 10 ? `0${hour}` : hour}:
          {0 <= min && min < 10 ? `0${min}` : min}:
          {0 <= sec && sec < 10 ? `0${sec}` : sec}
        </>
      )}
    </>
  );
};
