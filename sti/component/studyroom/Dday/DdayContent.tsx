// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

// css
import widget from '../../../styles/Widget.module.css';

// mui
import Draggable from 'react-draggable';
import { TextField } from '@mui/material';

// recoil
import { useRecoilState } from 'recoil';
import { DdayModalOpen } from '../../../lib/recoil/Modal';

interface Test {}

const DdayContent: Test = () => {
  const ddayInfo = [
    {
      ddayId: 1,
      ddayTitle: '수능',
      ddayDate: '2022-11-17',
      ddayLeft: 13
    },
    {
      ddayId: 2,
      ddayTitle: '싸탈',
      ddayDate: '2022-12-31',
      ddayLeft: 20
    }
  ];
  return (
    <>
      <div>
        {ddayInfo.map((dday) => (
          <DdayContentContainer>
            <div id="ddayLeft">D - {dday.ddayLeft}</div>
            <div>
              <div id="ddayTitle">{dday.ddayTitle}</div>
              <div>{dday.ddayDate}</div>
            </div>
          </DdayContentContainer>
        ))}
      </div>
    </>
  );
};

export default DdayContent;

const DdayContentContainer = styled.div`
  // background-color: #d9d9d9;
  height: 80px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  justify-content: space-evenly;
  align-items: center;
  #ddayLeft {
    font-size: 24px;
    font-weight: bold;
  }
  #ddayTitle {
    font-size: 18px;
    font-weight: bold;
  }
`;
