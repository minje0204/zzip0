// @ts-nocheck
import { useEffect, useState } from 'react';
//mui
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
//component
import VideoHeartModal from './VideoHeartModal';
// recoil
import { atom, selector, useRecoilState } from 'recoil';
import { volumeState, backgroundBEState } from '../../../lib/recoil/background';

import {
  likeBackground,
  dislikeBackground,
  getLikeBackground
} from '../../../lib/api/background';

interface Test {}

const VideoHeart: Test = () => {
  // const [open, setOpen] = useState(false);
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const [datas, setDatas] = useState([]);
  const [isLike, setIsLike] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const getLikeVideo = () => {
    getLikeBackground().then((res) => {
      setDatas(res.data);
    });
  };

  const likeVideo = () => {
    if (isLike) {
      dislikeBackground({ bgId: backgroundBE.bgId }).then();
      alert(`${backgroundBE.bgTitle} dislike!`);
      setIsLike(false);
    } else {
      likeBackground({ bgId: backgroundBE.bgId }).then();
      alert(`${backgroundBE.bgTitle} like!`);
      setIsLike(true);
    }
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '5px',
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
        {isLike ? (
          <img src={`/heart.png`} style={{ width: '23px' }} />
        ) : (
          <img src={`/empty_heart.png`} style={{ width: '23px' }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleClick}
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
        <VideoHeartModal />
      </Popover>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <VideoHeartModal />
        </Box>
      </Modal> */}
    </div>
  );
};

export default VideoHeart;
