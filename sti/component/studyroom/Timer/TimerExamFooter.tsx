// @ts-nocheck
import React, { useEffect } from 'react';
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
import { subjectObjectKoKey } from '../../subject';
interface Test {}

const TimerExamFooter: Test = () => {
  const choosedSbjs = useRecoilValue(choosedSubjects);
  const [savedTime, setSavedTime] = useRecoilState(savedState);

  useEffect(() => {
    console.log(choosedSbjs);
    console.log(savedTime);
  }, []);
  return (
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
                  {/* 남은시간 언제 보여줄지 모르겠지만 계산해서 보여주면 될듯~ */}
                  {subject.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TimerExamFooter;
