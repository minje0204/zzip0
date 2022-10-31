// @ts-nocheck

import React from 'react';
import home from '../../styles/Home.module.css';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

interface Test {}

const TodayMy: Test = () => {
  const myStudytime = '00:31:27';
  return (
    <div className={home.homecontainer}>
      <StudyContainer>
        <StudyTimeTitle>오늘 나의 공부시간</StudyTimeTitle>
        <StudyTime>{myStudytime}</StudyTime>
        <div style={{ textAlign: 'right' }}>
          <GoStudyBtn
            variant="contained"
            color="secondary"
            sx={{ color: 'primary.light' }}
          >
            공부하러 바로가기
          </GoStudyBtn>
        </div>
      </StudyContainer>
    </div>
  );
};

export default TodayMy;

const StudyContainer = styled.div({
  background: '#D9D9D9',
  width: '100%',
  height: '150px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '5px'
});

const StudyTimeTitle = styled.div({
  fontSize: '20px',
  textAlign: 'left',
  marginBottom: '15px'
});

const StudyTime = styled.div({
  fontSize: '30px',
  textAlign: 'right'
});

const GoStudyBtn = styled.button({
  background: '#E39685',
  fontSize: '15px',
  padding: '10px',
  borderRadius: '5px',
  borderStyle: 'none',
  cursor: 'pointer'
});
