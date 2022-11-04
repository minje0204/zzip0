// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

// mui
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);
const dateStr = year + '-' + month + '-' + day;
interface Test {}

const DdayInput: Test = () => {
  const [ddayTitle, setDdayTitle] = useState('');
  const [ddayDate, setDdayDate] = useState(dateStr);
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      addDday();
    }
  };
  const addDday = (e) => {
    if (!ddayTitle) {
      alert('디데이 이름 입력해주세요 !');
      return;
    }
    if (!ddayDate) {
      alert('결전의 날을 입력해주세요 !');
      return;
    }
    console.log(ddayTitle, ddayDate);
    //보내기
    // setDdayTitle('');
    // setDdayDate('');
  };

  return (
    <DdayInputContainer>
      <TextField
        id="date"
        type="date"
        defaultValue={dateStr}
        sx={{ width: 140, m: 1 }}
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        onChange={(e) => {
          setDdayDate(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        value={ddayTitle}
        sx={{ width: '200px', paddingTop: 1.2 }}
        inputProps={{
          maxLength: 11,
          style: { fontSize: 16, fontFamily: 'CircularStd' }
        }}
        autoFocus
        placeholder="내용을 입력하세요"
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setDdayTitle(e.target.value);
        }}
      />
      <IconButton
        aria-label="add"
        onClick={addDday}
        size="small"
        sx={{ marginTop: 1.3, height: 30 }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </DdayInputContainer>
  );
};

export default DdayInput;

// dday_title: '수능',
// dday_date: '20221011'
const DdayInputContainer = styled.div`
  display: flex;
`;
