// @ts-nocheck

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { getLikeBackground } from '../../../lib/api/background';


interface Test { }

const VideoHeartModal: Test = () => {
  const [datas, setDatas] = useState([])

  const getLikeVideo = () => {
    getLikeBackground()
    .then((res) => {console.log(res.data);setDatas(res.data)})
  };

  useEffect(() => {
    getLikeVideo()
  },[])

  return (
    <HartModalContainer>
      {console.log(datas[0])}
    </HartModalContainer>
  );
};

const HartModalContainer = styled.div`
  display: flex;
  justify-content: center;

  background-color: white;

`;

export default VideoHeartModal