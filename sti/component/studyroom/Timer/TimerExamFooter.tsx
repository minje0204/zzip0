// @ts-nocheck
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Test {}

const TimerExamFooter: Test = () => {
  return (
    <div>
      <div>
        <BasicTable />
      </div>
    </div>
  );
};

function createData(name: string, h: number, m: number, s: number) {
  return { name, h, m, s };
}

const rows = [
  createData('국어', 0, 6, 24),
  createData('수학', 0, 9, 37),
  createData('영어', 0, 16, 24),
  createData('한국사', 0, 3, 47),
  createData('탐구1', 0, 7, 17),
  createData('탐구2', 0, 16, 29),
  createData('제2외국어', 0, 16, 49)
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '250px' }} aria-label="simple table">
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                sx={{ fontSize: '10px', padding: '10px' }}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: '10px', padding: '10px' }}
              >
                {row.h < 10 ? `0${row.h}` : row.h}:
                {row.m < 10 ? `0${row.m}` : row.m}:
                {row.s < 10 ? `0${row.s}` : row.s}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TimerExamFooter;
