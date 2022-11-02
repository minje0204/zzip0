// @ts-nocheck

import React, {useState} from 'react';
import styled from 'styled-components';

// mui
import { IconButton } from '@mui/material';

const TimerTodoItems = ({ data }) => {

  return (
    <div>
      <TodoTimerItemsContainer>
          {data.subject} / {data.content} / {data.time}
      </TodoTimerItemsContainer>
    </div>
  );
};

const TodoTimerItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default TimerTodoItems;
