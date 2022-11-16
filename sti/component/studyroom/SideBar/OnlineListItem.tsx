// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';
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

const VideoHeartModal: Test = ({ data }) => {
  const useStyles = makeStyles((theme) => ({
    listItemText: {
      fontSize: '14px',
      fontColor: '4e4e4e'
    }
  }));
  const moveProfile = () => {
    // router.push(`/report/${data.providerId}`);
    window.open(`/report/${data.providerId}`, '_blank');
  };

  const classes = useStyles();

  return (
    <HeartModalContainer>
      <div id="heartbox">
        <ListItemButton
          sx={{
            borderRadius: 2,
            border: 0.1,
            borderColor: '#e9e9e9',
            marginBottom: 0.6,
            width: '200px'
          }}
          onClick={() => {
            moveProfile();
          }}
        >
          <ListItemText
            primary={`${data.memberName}`}
            classes={{ primary: classes.listItemText }}
          />
        </ListItemButton>
      </div>
      <List component="nav" aria-label="main mailbox folders"></List>
    </HeartModalContainer>
  );
};

const HeartModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  align-items: center;
  font-size: 14px;

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
`;

export default VideoHeartModal;
