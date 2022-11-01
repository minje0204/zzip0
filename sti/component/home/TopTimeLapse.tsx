// @ts-nocheck

import React, { useState } from 'react';
import home from '../../styles/Home.module.css';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import Background from '../studyroom/Background';

interface Test {}

const TopTimeLapse: Test = () => {
  const topUsers = [
    ['손', '09:48:22'],
    ['예수', '09:42:34'],
    ['갱얼쥐', '09:39:55']
  ];
  const [isPlaying, setIsPlaying] = useState([false, false, false]);
  return (
    <div className={home.homecontainer}>
      <TopTimeLapseContainer>
        <TopTimeLapseTitle>🔥Top 2-4🔥</TopTimeLapseTitle>
        <TopTimeLapses>
          {topUsers.map((topUser, idx) => (
            <OneTimeLapse
              onMouseOut={(event) => {
                setIsPlaying([
                  ...isPlaying.slice(0, idx),
                  !isPlaying[idx],
                  ...isPlaying.slice(idx + 1, 3)
                ]);
              }}
            >
              {isPlaying[idx] ? null : (
                <NameAndTime>
                  <div>{topUser[0]}님</div>
                  <div>{topUser[1]}</div>
                </NameAndTime>
              )}
            </OneTimeLapse>
          ))}
        </TopTimeLapses>
      </TopTimeLapseContainer>
    </div>
  );
};

export default TopTimeLapse;

const TopTimeLapseContainer = styled.div({
  background: '#D9D9D9',
  width: '100%',
  height: '300px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '5px',
  overflow: 'hidden'
});
const TopTimeLapseTitle = styled.div({
  margin: '0 10px 10px 0',
  fontSize: '20px'
});
const TopTimeLapses = styled.div({
  display: 'flex',
  minWidth: '1000px',
  justifyContent: 'center'
});
const OneTimeLapse = styled.div({
  background: '#616161',
  width: '320px',
  height: '180px',
  borderRadius: '5px',
  color: 'white',
  margin: '15px',
  fontSize: '20px'
});
const NameAndTime = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexDirection: 'column'
});
