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
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const [datas, setDatas] = useState([]);
  const [isLike, setIsLike] = useState(false);

  const getLikeVideo = () => {
    getLikeBackground().then((res) => {
      setDatas(res.data);
      CheckIsLike(res.data);
    });
  };

  const CheckIsLike = () => {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].bgId == backgroundBE.bgId) {
        setIsLike(true);
        return;
      }
    }
    setIsLike(false);
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

  useEffect(() => {
    getLikeVideo();
  }, []);
  useEffect(() => {
    CheckIsLike();
  }, [datas, backgroundBE]);

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
    </div>
  );
};

export default VideoHeart;
