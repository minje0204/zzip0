// @ts-nocheck
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import RoomItems from './RoomItems';

interface Test {}

const RoomHeader: Test = ({}) => {
  useEffect(() => {}, []);

  return (
    <>
      <RoomHeaderContainer>
        <div>
          <img src="/study.png" style={{ width: '100px' }} />
        </div>
        <div id="room-header-content">
          <span id="room-header-title">집에서 집중해서 공부! zzip_0</span>
          <span>다른 사람들의 방에 참여해서 공부해보세요!</span>
        </div>
      </RoomHeaderContainer>
    </>
  );
};

const RoomHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  #room-header-content {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #room-header-title {
    font-size: 30px;
    font-weight: 700;
  }
`;

export default RoomHeader;
