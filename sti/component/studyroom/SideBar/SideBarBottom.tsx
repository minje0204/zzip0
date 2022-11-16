// @ts-nocheck

import React from 'react';
import styled from 'styled-components';
import OnlineItem from './OnlineItem';
import Button from '@mui/material/Button';

interface Test {}

const SideBarBottom: Test = () => {
  return (
    <SideBarBottomContainer>
      <Button
        variant="outlined"
        sx={{ width: '100px', padding: '3px' }}
        fontSize="12px"
        color="inherit"
      >
        무슨 버튼
      </Button>
      <Button
        variant="outlined"
        sx={{ width: '100px', padding: '3px' }}
        fontSize="12px"
        color="inherit"
      >
        무슨 버튼
      </Button>
      <Button
        variant="outlined"
        sx={{ width: '100px', padding: '3px' }}
        fontSize="12px"
        color="inherit"
      >
        나가기
      </Button>
    </SideBarBottomContainer>
  );
};

const SideBarBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export default SideBarBottom;
