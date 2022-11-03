// @ts-nocheck

import React from 'react';

//mui
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//component
import VideoHeartModal from './VideoHeartModal';

interface Test {}

const VideoHeart: Test = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <div>
      <IconButton
        variant="outlined"
        sx={{
          width: 38,
          height: 38,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          padding: 1.7,
          borderRadius: 2,
          margin: 0.3
        }}
        size="medium"
      >
        <img src={`/heart.png`} style={{ width: '23px' }} />
      </IconButton>
      <IconButton
        onClick={handleOpen}
        variant="outlined"
        sx={{
          width: 38,
          height: 38,
          backgroundColor: 'white',
          border: 1,
          borderColor: '#e9e9e9',
          padding: 1.7,
          borderRadius: 2,
          margin: 0.3
        }}
        size="medium"
      >
        <img src={`/playlist.png`} style={{ width: '23px' }} />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <VideoHeartModal />
        </Box>
      </Modal>
    </div>
  );
};

export default VideoHeart;
