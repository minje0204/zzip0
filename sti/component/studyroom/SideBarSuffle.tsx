// @ts-nocheck

import React, {useEffect} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { atom, selector, useRecoilState } from 'recoil';
import { backgroundState } from '../../recoil/backgroundState';
import { videoLink } from './VideoLink';

interface Test {}

// const cateurl = selector({
//   key: 'cateurl',
//   get: ({get}) => ({...get(backgroundState)}),
//   set: ({set}, newValue) => set(backgroundState, newValue),
// });

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
    <Button variant="contained" onClick={(e) => changeVideo({cate})}>
      {cate}
    </Button>
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
