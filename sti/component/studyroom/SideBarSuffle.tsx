// @ts-nocheck

import React, {useEffect} from 'react';
import styled from 'styled-components';

// mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// recoil
import { atom, selector, useRecoilState } from 'recoil';
import { backgroundState } from '../../recoil/backgroundState';

// component
import { videoLink } from './VideoLink';

interface Test {}

const SideBarSuffle: Test = () => {
  const [suffleUrl, setSuffleUrl] = useRecoilState(backgroundState);

  const changeVideo = ({ cate }) => {
    setSuffleUrl(videoLink[cate][0]);
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

  const cateList = cates.map((cate) => (
    <Tooltip title={`${cate}`} followCursor>
      <IconButton  variant="contained" onClick={(e) => changeVideo({cate})} size="large">
        <img src={`/${cate}.png`} style={{width:'50px'}} />
      </IconButton >
    </Tooltip>
  ));

  return <CateContainer>{cateList}</CateContainer>;
};

const CateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 40px 0 80px 0;
`;

export default SideBarSuffle;
