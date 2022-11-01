// @ts-nocheck

import React from 'react';
import home from '../../styles/Home.module.css';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

interface Test {}

const TimeLapse: Test = () => {
  const yesterday = '22-10-27';
  const bestNickname = '어머';
  const myNickname = '아버';
  return (
    <div className={home.homecontainer}>
      <TimeLapseContainer>
        <Yesterday>{yesterday}</Yesterday>
        <TimeLapseContents>
          <TimeLapseContent>
            <Skeleton variant="rounded" width={320} height={180} />
            <Nickname>{bestNickname}님</Nickname>
          </TimeLapseContent>
          <TimeLapseContent>
            <Skeleton variant="rounded" width={320} height={180} />
            <Nickname>{myNickname}님</Nickname>
          </TimeLapseContent>
        </TimeLapseContents>
      </TimeLapseContainer>
    </div>
  );
};

export default TimeLapse;

const TimeLapseContainer = styled.div({
  background: '#D9D9D9',
  width: '100%',
  minWidth: '680px',
  height: '300px',
  padding: '10px',
  display: 'flex',
  borderRadius: '5px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'hidden'
});

const Yesterday = styled.div({
  width: '100%',
  marginLeft: '10px',
  fontSize: '28px'
});

const TimeLapseContents = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center'
});

const TimeLapseContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 80px'
});

const Nickname = styled.div({
  textAlign: 'center',
  marginTop: '10px',
  fontSize: '20px'
});
