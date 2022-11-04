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
// recoil
import { atom, selector, useRecoilState } from 'recoil';
import { volumeState, backgroundBEState } from '../../../lib/recoil/background';

import { likeBackground } from '../../../lib/api/background';

interface Test {}

const VideoHeart: Test = () => {
  const [open, setOpen] = React.useState(false);
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const likeVideo = () => {
    likeBackground({bgId :backgroundBE.bgId})
    .then()
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <div>
      <IconButton
        variant="outlined"
        onClick={likeVideo}
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
