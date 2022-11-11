// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// mui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
// api
import {
  getLikeBackground,
  dislikeBackground
} from '../../../lib/api/background';
// recoil
import { backgroundBEState } from '../../../lib/recoil/background';
import { useRecoilState } from 'recoil';

interface Test {}

const VideoHeartModal: Test = () => {
  const [datas, setDatas] = useState([]);
  const [video, setVideo] = useRecoilState(backgroundBEState);

  const getLikeVideo = () => {
    getLikeBackground().then((res) => {
      setDatas(res.data);
    });
  };

  const disLikeVideo = (id) => {
    dislikeBackground({ bgId: id }).then();
    alert(`dislike!`);
  };

  const ChangeVideo = (value) => {
    setVideo(value);
  };

  const useStyles = makeStyles((theme) => ({
    listItemText: {
      fontSize: '14px',
      fontColor: '4e4e4e'
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    getLikeVideo();
  }, [datas]);

  useEffect(() => {
    getLikeVideo();
  }, []);

  return (
    <HeartModalContainer>
      <div id="heart-modal-title">My favorites</div>
      <div id="heartbox">
        <HeartInfoContainer>
          {datas.map((v) => (
            <div id="heartConentContainer" key={v.bgId}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  border: 0.1,
                  borderColor: '#e9e9e9',
                  marginBottom: 0.6,
                  width: '240px'
                }}
                onClick={() => {
                  ChangeVideo(v);
                }}
              >
                <ListItemIcon>
                  <img
                    src={`/${v.bgCategory.toLowerCase()}.png`}
                    style={{ width: '25px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${v.bgTitle}`}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItemButton>
              <IconButton
                onClick={() => {
                  disLikeVideo(v.bgId);
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </HeartInfoContainer>
      </div>
      <List component="nav" aria-label="main mailbox folders"></List>
    </HeartModalContainer>
  );
};

const HeartModalContainer = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  width: 340px;
  padding: 20px;
  align-items: center;
  font-size: 14px;

  #heart-modal-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #4e4e4e;
  }

  #heartbox::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  #heartbox::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #e9e9e9; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  #heartbox::-webkit-scrollbar-track {
    background: white; /*스크롤바 뒷 배경 색상*/
  }
  #heartConentContainer {
    display: flex;
    justify-content: center;
  }
  #heartInfoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }
`;

const HeartInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default VideoHeartModal;
