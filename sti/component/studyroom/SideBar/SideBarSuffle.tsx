// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// lib
import { atom, selector, useRecoilState } from 'recoil';
import { backgroundBEState } from '../../../lib/recoil/background';
import { roomKingAPI } from '../../../lib/api/room';
import { myroomState } from '../../../lib/recoil/room';
// component
import { videoLink } from '../Background/VideoLink';
import { getBackground } from '../../../lib/api/background';

interface Test {}
const SideBarSuffle: Test = () => {
  const router = useRouter();
  const params = router.query;
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [isKing, setIsKing] = useState(false);
  const [upCate, setUpCate] = useState('');
  const changeVideo = ({ cate }) => {
    getBackground(cate.toUpperCase()).then((res) => {
      setBackgroundBE(res.data);
    });
  };
  const cates = [
    'christmas',
    'city',
    'beach',
    'cafe',
    'games',
    'library',
    'pets',
    'lofi'
  ];

  // 방장인지 저장해줌
  useEffect(() => {
    roomKingAPI(roomInfo.id).then((res) => {
      setIsKing(res.data);
    });
  }, []);

  const cateList = cates.map((cate) => (
    <Tooltip
      key={cate}
      title={<Typography fontSize={20}>{cate}</Typography>}
      followCursor
    >
      <IconButton
        variant="outlined"
        sx={{
          border: 1,
          borderColor: '#e9e9e9',
          padding: 1.7,
          borderRadius: 4,
          margin: 0.5
        }}
        onClick={(e) => changeVideo({ cate })}
        size="medium"
      >
        <img src={`/${cate}.png`} style={{ width: '30px' }} />
      </IconButton>
    </Tooltip>
  ));

  const disabledList = cates.map((cate) => (
    <IconButton
      variant="outlined"
      sx={{
        border: 1,
        borderColor: '#e9e9e9',
        padding: 1.7,
        borderRadius: 4,
        margin: 0.5,
        backgroundColor: 'gray'
      }}
      disabled
      size="medium"
    >
      <img src={`/${cate}.png`} style={{ width: '30px' }} />
    </IconButton>
  ));

  return (
    <>
      <CateTextContainer>
        <Typography variant="h6">Suffle Spacese</Typography>
        <Typography variant="caption">
          Click an emoji muliple times for more content
        </Typography>
      </CateTextContainer>
      {console.log('king', isKing)}
      <CateContainer>
        {isKing ? <>{cateList}</> : <>{disabledList}</>}
      </CateContainer>
    </>
  );
};

const CateTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
`;

const CateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5px 0 20px 0;
`;

export default SideBarSuffle;
