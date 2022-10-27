// @ts-nocheck

import React, { useEffect }  from 'react';
import styled from 'styled-components';

// recoil, 추후에 새로고침해도 유지되는 리코일 추가
import {atom,  useRecoilState, useRecoilValue} from "recoil";
// import { recoilPersist } from 'recoil-persist';
import { backgroundState } from '../../recoil/backgroundState';

interface Test {}

const Background: Test = () => {
  const background = useRecoilValue(backgroundState)

  useEffect(() => {console.log('newurl')}, [background])

  return (
    <>
      <VideoPlayer>
        <PlayerContainer>
          <PlayerContainer2>
            <iframe
              src={`${background}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&disablekb=1&playsinline=1&showinfo=0&iv_load_policy=3&enablejsapi=1s&allowfullscreen=1&frameborder=0`}
              height="100%"
              width="100%"
            ></iframe>
          </PlayerContainer2>
        </PlayerContainer>
      </VideoPlayer> 
    </>
  );
};

const VideoPlayer = styled.div`
  position: fixed;
  z-index: -1;
  top: -12%;
  left: 0;
  overflow: hidden;
  user-select: text;
  width: 100vw;
  height: 100vh;
`;

const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-aspect-ratio: 16 / 9;
`;

const PlayerContainer2 = styled.div`
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  width: 110vmax; 
  height: 110vmax;
  transform: translate(-50%, -50%);
  @media (max-aspect-ratio: 16 / 9) {
    width: 177.78vh !important;
    height: 120% !important;
  }
`;

export default Background;
