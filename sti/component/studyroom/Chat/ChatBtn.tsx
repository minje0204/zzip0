// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChatView from './ChatView';

const ChatBtn = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ChatBtnContainer>
      <Button onClick={handleClick} variant="outlined" size="medium">
        <img src={`/playlist.png`} style={{ width: '23px' }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
      >
        <ChatView />
      </Popover>
    </ChatBtnContainer>
  );
};
const ChatBtnContainer = styled.div``;
export default ChatBtn;
