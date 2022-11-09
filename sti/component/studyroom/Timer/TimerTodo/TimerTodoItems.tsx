// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';

// mui
import { IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/joy/Radio';
import ListItemIcon from '@mui/material/ListItemIcon';
const TimerTodoItems = ({ data }) => {
  return (
    <div>
      <ListItem variant="outlined" key={item}>
        <ListItemDecorator>
          {data.subject}
        </ListItemDecorator>
        <Radio
          overlay
          value={item}
          label={item}
          sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
          componentsProps={{
            action: ({ checked }) => ({
              sx: (theme) => ({
                ...(checked && {
                  inset: -1,
                  border: '2px solid',

                })
              })
            })
          }}
        />
      </ListItem>
    </div>
  );
};

const TodoTimerItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default TimerTodoItems;
