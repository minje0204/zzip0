// @ts-nocheck

import React from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';

interface Test { }

const SideBarMenu: Test = () => {

  return (
    <SideBarMenuContainer>
      <div>
        <Button variant="outlined">Todo</Button>
        <Button variant="outlined">Timer</Button>
        <Button variant="outlined">Clock</Button>
      </div>
    </SideBarMenuContainer>
  );
};

const SideBarMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;


export default SideBarMenu