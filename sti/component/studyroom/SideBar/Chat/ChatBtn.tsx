// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChatView from './ChatView';
import ChatIcon from '@mui/icons-material/Chat';

const ChatBtn = ({ socketConnection }) => {
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
      <Button
        onClick={handleClick}
        variant="outlined"
        size="large"
        sx={{ backgroundColor: '#4976fd' }}
      >
        <ChatIcon style={{ width: '50px', fill: 'white' }} />
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
        <ChatView socketConnection={socketConnection} />
      </Popover>
    </ChatBtnContainer>
  );
};
const ChatBtnContainer = styled.div``;
export default ChatBtn;
