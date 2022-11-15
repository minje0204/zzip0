// @ts-nocheck
import React, { useState, useEffect } from 'react';
// mui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import RadioGroup from '@mui/joy/RadioGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
        <div>
          <TableContainer>
            <Table sx={{ width: '250px' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: '30%' }}>
                    과목
                  </TableCell>
                  <TableCell align="center" sx={{ width: '45%' }}>
                    목표
                  </TableCell>
                  <TableCell align="center" sx={{ width: '25%' }}>
                    걸린 시간
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todoList.map((todo, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ fontSize: '10px' }}
                    >
                      {subjectObjectEnKey[todo.subject]}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '10px' }}>
                      {todo.content}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '10px' }}>
                      <ComputeTime todoSec={todo.time} />
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
